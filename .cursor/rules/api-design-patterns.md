# API Design & Routing Patterns
*ShortPoint Standalone - RESTful API Standards and Implementation Guidelines*

## Core API Principles

### RESTful Design Standards
- **Resource-based URLs** with consistent naming conventions
- **HTTP methods** align with CRUD operations (GET, POST, PUT, DELETE)
- **Stateless requests** with authentication via JWT tokens
- **Consistent response formats** for all endpoints
- **Tenant-based data isolation** enforced on every request

### Authentication & Authorization
- **JWT tokens** in Authorization header for all protected routes
- **Middleware-based auth** validation before controller execution
- **Role-based access control** (Admin/Normal) checked per endpoint
- **Tenant isolation** automatically enforced via middleware

## API Route Structure

### Base Route Patterns
```
/api/auth/*           # Authentication endpoints
/api/tenants/*        # Tenant management
/api/sites/*          # Site management  
/api/sites/[siteId]/* # Site-specific resources
```

### Authentication Endpoints
```typescript
GET  /api/auth/user                    // Get current user profile
POST /api/auth/role                    // Assign user role
GET  /api/auth/permissions             // Get user permissions
POST /api/auth/webhook/clerk           // Clerk webhook handler
```

### Tenant Management
```typescript
GET  /api/tenants                      // Get current tenant info
PUT  /api/tenants/config               // Update tenant configuration
GET  /api/tenants/sites                // Get all tenant sites
GET  /api/tenants/users                // Get tenant users (Admin only)
POST /api/tenants/users/invite         // Invite user to tenant (Admin only)
```

### Site Management
```typescript
POST   /api/sites                      // Create new site
GET    /api/sites                      // Get tenant sites (filtered by permissions)
GET    /api/sites/[siteId]             // Get site details
PUT    /api/sites/[siteId]             // Update site configuration
DELETE /api/sites/[siteId]             // Delete site (Admin only)
POST   /api/sites/[siteId]/duplicate   // Duplicate site (Admin only)
```

### Page Management
```typescript
GET    /api/sites/[siteId]/pages                    // Get all site pages
POST   /api/sites/[siteId]/pages                    // Create new page
GET    /api/sites/[siteId]/pages/[pageId]           // Get page content
PUT    /api/sites/[siteId]/pages/[pageId]           // Update page content
DELETE /api/sites/[siteId]/pages/[pageId]           // Delete page
GET    /api/sites/[siteId]/pages/[pageId]/versions  // Get page version history
POST   /api/sites/[siteId]/pages/[pageId]/publish   // Publish page
POST   /api/sites/[siteId]/pages/[pageId]/revert    // Revert to previous version
```

### Navigation Management
```typescript
GET /api/sites/[siteId]/navigation     // Get navigation structure
PUT /api/sites/[siteId]/navigation     // Update navigation structure
```

### Asset Management
```typescript
GET    /api/sites/[siteId]/assets               // Get assets library
POST   /api/sites/[siteId]/assets               // Upload new asset
GET    /api/sites/[siteId]/assets/[assetId]     // Get asset details
DELETE /api/sites/[siteId]/assets/[assetId]     // Delete asset
PUT    /api/sites/[siteId]/assets/[assetId]     // Update asset metadata
```

### Theme Management
```typescript
GET /api/sites/[siteId]/theme          // Get theme configuration
PUT /api/sites/[siteId]/theme          // Update theme settings
```

### Team Management
```typescript
GET    /api/sites/[siteId]/team               // Get site team members
POST   /api/sites/[siteId]/team               // Add team member
DELETE /api/sites/[siteId]/team/[userId]      // Remove team member
PUT    /api/sites/[siteId]/team/[userId]      // Update member role
```

## Request/Response Standards

### Standard Response Format
```typescript
// Success Response
interface APIResponse<T> {
  success: true
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    hasMore?: boolean
  }
}

// Error Response
interface APIError {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
  statusCode: number
}
```

### HTTP Status Codes
```typescript
200 // OK - Successful GET, PUT
201 // Created - Successful POST
204 // No Content - Successful DELETE
400 // Bad Request - Invalid input/validation errors
401 // Unauthorized - Authentication required
403 // Forbidden - Insufficient permissions
404 // Not Found - Resource doesn't exist
409 // Conflict - Resource already exists/business logic conflict
422 // Unprocessable Entity - Validation errors
500 // Internal Server Error - Unexpected server errors
```

### Request Validation
```typescript
// Input Validation with Zod
import { z } from 'zod'

const createSiteSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
})

// Middleware for validation
export const validateBody = (schema: z.ZodSchema) => {
  return async (req: NextRequest) => {
    const body = await req.json()
    const result = schema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: result.error.issues
        }
      }, { status: 422 })
    }
    
    return result.data
  }
}
```

## Authentication Middleware

### JWT Token Validation
```typescript
// middleware.ts
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/api/auth/webhook']
  
  if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Check authentication
  const { userId } = auth()
  
  if (!userId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    }, { status: 401 })
  }
  
  // Get user with tenant information
  const user = await getUserWithTenant(userId)
  
  if (!user) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User record not found'
      }
    }, { status: 404 })
  }
  
  // Add user context to request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', user.id)
  requestHeaders.set('x-tenant-id', user.tenantId)
  requestHeaders.set('x-user-role', user.role)
  
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/api/(.*)']
}
```

### Permission Checking
```typescript
// utils/permissions.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL'
}

export const requireRole = (requiredRole: UserRole) => {
  return (req: NextRequest) => {
    const userRole = req.headers.get('x-user-role') as UserRole
    
    if (!userRole) {
      throw new Error('User role not found in request context')
    }
    
    if (requiredRole === UserRole.ADMIN && userRole !== UserRole.ADMIN) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Admin privileges required'
        }
      }, { status: 403 })
    }
    
    return null // Permission granted
  }
}

// Usage in API routes
export async function DELETE(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  // Check admin permission
  const permissionCheck = requireRole(UserRole.ADMIN)(request)
  if (permissionCheck) return permissionCheck
  
  // Continue with deletion logic...
}
```

## Data Access Patterns

### Tenant Isolation Enforcement
```typescript
// utils/database.ts
export const getTenantContext = (request: NextRequest) => {
  const tenantId = request.headers.get('x-tenant-id')
  const userId = request.headers.get('x-user-id')
  
  if (!tenantId || !userId) {
    throw new Error('Tenant context not found in request')
  }
  
  return { tenantId, userId }
}

// All database queries MUST include tenant filtering
export const getSitesForTenant = async (tenantId: string) => {
  return await prisma.site.findMany({
    where: {
      tenant_id: tenantId // REQUIRED for tenant isolation
    }
  })
}

// ❌ NEVER query without tenant isolation
export const getSitesUnsafe = async () => {
  return await prisma.site.findMany() // Security violation!
}
```

### Common Database Patterns
```typescript
// Get paginated results with tenant filtering
export const getPaginatedPages = async (
  tenantId: string,
  siteId: string,
  page: number = 1,
  limit: number = 20
) => {
  const skip = (page - 1) * limit
  
  const [pages, total] = await Promise.all([
    prisma.page.findMany({
      where: {
        tenant_id: tenantId,
        site_id: siteId
      },
      skip,
      take: limit,
      orderBy: { updated_at: 'desc' }
    }),
    prisma.page.count({
      where: {
        tenant_id: tenantId,
        site_id: siteId
      }
    })
  ])
  
  return {
    data: pages,
    meta: {
      page,
      limit,
      total,
      hasMore: skip + limit < total
    }
  }
}
```

## Error Handling

### Standardized Error Types
```typescript
// types/errors.ts
export class APIError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: any) {
    super('VALIDATION_ERROR', message, 422, details)
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404)
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string = 'Access denied') {
    super('FORBIDDEN', message, 403)
  }
}

export class ConflictError extends APIError {
  constructor(message: string) {
    super('CONFLICT', message, 409)
  }
}
```

### Global Error Handler
```typescript
// utils/errorHandler.ts
export const handleAPIError = (error: unknown): NextResponse => {
  console.error('API Error:', error)
  
  if (error instanceof APIError) {
    return NextResponse.json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    }, { status: error.statusCode })
  }
  
  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNIQUE_CONSTRAINT',
          message: 'A record with this value already exists',
          details: error.meta
        }
      }, { status: 409 })
    }
  }
  
  // Default server error
  return NextResponse.json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  }, { status: 500 })
}

// Usage in API routes
export async function POST(request: NextRequest) {
  try {
    // API logic here...
    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    return handleAPIError(error)
  }
}
```

## Real-time Integration

### Supabase Real-time Setup
```typescript
// lib/realtime.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Subscribe to page changes
export const subscribeToPageChanges = (siteId: string, callback: Function) => {
  return supabase
    .channel(`page_changes_${siteId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'pages',
        filter: `site_id=eq.${siteId}`
      },
      callback
    )
    .subscribe()
}

// Broadcast page updates
export const broadcastPageUpdate = async (siteId: string, pageData: any) => {
  await supabase
    .channel(`page_changes_${siteId}`)
    .send({
      type: 'broadcast',
      event: 'page_updated',
      payload: pageData
    })
}
```

## API Documentation

### OpenAPI/Swagger Integration
```typescript
// Example endpoint documentation
/**
 * @swagger
 * /api/sites/{siteId}/pages:
 *   get:
 *     summary: Get all pages for a site
 *     parameters:
 *       - name: siteId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Successfully retrieved pages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Page'
 */
```

## Testing Standards

### API Route Testing
```typescript
// __tests__/api/sites.test.ts
import { testApiHandler } from 'next-test-api-route-handler'
import handler from '@/pages/api/sites'

describe('/api/sites', () => {
  it('returns tenant sites for authenticated user', async () => {
    await testApiHandler({
      handler,
      requestPatcher: (req) => {
        req.headers['x-tenant-id'] = 'test-tenant-id'
        req.headers['x-user-id'] = 'test-user-id'
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'GET' })
        const data = await response.json()
        
        expect(response.status).toBe(200)
        expect(data.success).toBe(true)
        expect(Array.isArray(data.data)).toBe(true)
      }
    })
  })
})
```

This API design specification ensures consistent, secure, and maintainable backend services for the ShortPoint Standalone application.
