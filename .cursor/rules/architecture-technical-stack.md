# Architecture & Technical Stack Specification
*ShortPoint Standalone - System Architecture and Development Guidelines*

## Core Architecture Principles

### Multi-tenant SaaS Architecture
- **Isolated data per organization** with tenant-based filtering
- **Hierarchical structure**: Tenant → Sites → Pages → Content
- **Role-based access control** with Admin and Normal user permissions
- **Single database** with tenant-based data isolation via foreign keys
- **API-first approach** with RESTful endpoints

### Application Architecture Pattern
- **Single Page Application (SPA)** with Next.js App Router
- **Component-based architecture** using React functional components
- **Atomic design methodology** for UI component organization
- **Middleware-based authentication** and authorization
- **Event-driven updates** for real-time collaboration

## Technical Stack

### Frontend Technologies
```json
{
  "framework": "Next.js 14+ with App Router",
  "language": "TypeScript",
  "ui_library": "React 18+ with functional components and hooks",
  "styling": "Tailwind CSS for responsive design",
  "components": "Shadcn/ui component library",
  "icons": "Lucide React",
  "notifications": "Sonner for toast messages",
  "forms": "React Hook Form",
  "state_management": "Zustand + TanStack Query"
}
```

### Backend & Database
```json
{
  "api": "Next.js API Routes",
  "orm": "Prisma ORM for database operations and migrations",
  "database": "Supabase PostgreSQL",
  "storage": "Supabase Storage for file and asset management", 
  "realtime": "Supabase Real-time for live collaboration features"
}
```

### Authentication & Authorization
```json
{
  "auth_provider": "Clerk for user authentication and management",
  "tokens": "JWT tokens for API authorization",
  "middleware": "Role-based middleware for route protection",
  "isolation": "Multi-tenant user isolation via database queries"
}
```

### Deployment & Infrastructure
```json
{
  "hosting": "Vercel for hosting and deployment",
  "functions": "Vercel Edge Functions for global performance",
  "database_hosting": "Supabase for database and storage",
  "configuration": "Environment-based configuration for different stages"
}
```

## State Management Architecture

### Global State Management
- **Zustand stores** for application-wide state
- **Server state caching** with TanStack Query for API data
- **Authentication state** managed by Clerk
- **Theme state** persisted in localStorage and database

### Local State Management
- **React useState/useReducer** for component-specific state
- **React Hook Form** for form state and validation
- **Navigation state** synchronized across components

### Data Flow Patterns
```typescript
// State Flow Architecture
Client → API Routes → Database     // Data operations
Clerk → Middleware → Protected Routes    // Authentication
Zustand → Components    // Client-side state updates
Database triggers → Real-time subscriptions    // Live updates
File uploads → Supabase Storage → Database references    // Asset management
```

## Component Architecture

### Atomic Design Structure
```
src/components/
├── atoms/          # Basic building blocks (Button, Input, etc.)
├── molecules/      # Simple combinations (SearchBar, Card, etc.)
├── organisms/      # Complex components (DataTable, Navigation, etc.)
├── templates/      # Page layouts
└── pages/          # Complete page compositions
```

### Component Development Guidelines
- **Functional components only** - no class components
- **TypeScript interfaces** for all props and state
- **Compound component patterns** for complex UI elements
- **Custom hooks** for reusable logic
- **Proper error boundaries** for graceful error handling

## API Design Standards

### Authentication Endpoints
```typescript
GET /api/auth/user           // Get current user profile
POST /api/auth/role          // Assign user role
GET /api/auth/permissions    // Get user permissions
```

### Tenant Management
```typescript
GET /api/tenants             // Get tenant information
PUT /api/tenants/config      // Update tenant configuration
GET /api/tenants/sites       // Get all tenant sites
```

### Site Management
```typescript
POST /api/sites              // Create new site
GET /api/sites/[siteId]      // Get site details
PUT /api/sites/[siteId]      // Update site configuration
DELETE /api/sites/[siteId]   // Delete site
```

### Page Management
```typescript
GET /api/sites/[siteId]/pages              // Get all site pages
POST /api/sites/[siteId]/pages             // Create new page
GET /api/sites/[siteId]/pages/[pageId]     // Get page content
PUT /api/sites/[siteId]/pages/[pageId]     // Update page content
DELETE /api/sites/[siteId]/pages/[pageId]  // Delete page
```

### Asset & Theme Management
```typescript
GET /api/sites/[siteId]/assets             // Get assets library
POST /api/sites/[siteId]/assets            // Upload new asset
DELETE /api/sites/[siteId]/assets/[assetId] // Delete asset
GET /api/sites/[siteId]/theme              // Get theme configuration
PUT /api/sites/[siteId]/theme              // Update theme settings
```

## Authentication Process

### User Registration & Login Flow
1. **User registration/login** via Clerk (email, Google, Facebook)
2. **JWT token generation** and validation
3. **Middleware authentication** on protected routes
4. **Role assignment** (Admin/Normal) stored in database
5. **Domain-based tenant assignment** via email domain matching
6. **Multi-site access** based on user permissions

### Tenant Assignment Strategy
```typescript
// Domain-based Assignment Logic
1. Direct Domain Match: user@company.com → tenant with website containing "company.com"
2. Slug-based Match: user@my-company.com → tenant with slug "my-company-com"
3. Company Name Match: user@acme.com → tenant with company name containing "acme"
4. Fallback Assignment: Assign to first available tenant if no match found
```

### Middleware Protection Pattern
```typescript
// Authentication Middleware
export async function middleware(request: NextRequest) {
  const token = await getAuth(request)
  
  if (!token) {
    return redirectToSignIn()
  }
  
  // Add tenant context to request
  const user = await getUserWithTenant(token.userId)
  request.headers.set('x-tenant-id', user.tenantId)
  
  return NextResponse.next()
}
```

## Route Architecture

### Public Routes
- `/` - Landing page
- `/sign-in` - Authentication page
- `/sign-up` - User registration

### Protected Dashboard Routes
- `/dashboard` - Root tenant dashboard (Admin only)
- `/dashboard/sites` - Site collections overview
- `/dashboard/tenant-config` - Tenant configuration
- `/dashboard/licensing` - Licensing management
- `/dashboard/support` - Support contact

### Site-Level Protected Routes
- `/sites/[siteId]` - Site configuration dashboard
- `/sites/[siteId]/navigation` - Navigation structure editor
- `/sites/[siteId]/pages` - Pages management table
- `/sites/[siteId]/pages/[pageId]` - Individual page editor
- `/sites/[siteId]/assets` - Assets library management
- `/sites/[siteId]/team` - Site team management
- `/sites/[siteId]/theme` - Theme customization
- `/sites/[siteId]/settings` - Site-specific settings

## Development Best Practices

### Code Organization
- **Feature-based folder structure** for scalability
- **Barrel exports** for clean imports
- **Consistent naming conventions** (camelCase for JS, kebab-case for files)
- **TypeScript strict mode** enabled for type safety

### Performance Optimization
- **Client-side caching** with TanStack Query
- **Code splitting** at route and component levels
- **Image optimization** with Next.js Image component
- **Bundle analysis** for dependency optimization

### Error Handling
- **Global error boundaries** for unhandled errors
- **API error standardization** with consistent response formats
- **Client-side error logging** for debugging
- **Graceful degradation** for non-critical features

### Testing Strategy
- **Unit tests** for utility functions and hooks
- **Component testing** with React Testing Library
- **Integration tests** for API endpoints
- **E2E tests** for critical user flows

## Security Considerations

### Data Protection
- **Input validation** on all API endpoints
- **SQL injection protection** via Prisma ORM
- **XSS prevention** with proper data sanitization
- **CSRF protection** via SameSite cookies

### Access Control
- **Route-level protection** via middleware
- **API authorization** checking on every request
- **Tenant data isolation** enforced at database level
- **Role-based permissions** for feature access

## Deployment & Configuration

### Environment Configuration
```typescript
// Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY    // Clerk authentication
CLERK_SECRET_KEY                     // Clerk backend secret
DATABASE_URL                         // Supabase database connection
SUPABASE_URL                        // Supabase project URL
SUPABASE_ANON_KEY                   // Supabase anonymous key
NEXT_PUBLIC_APP_URL                 // Application base URL
```

### Build & Deployment Process
1. **Type checking** - Ensure TypeScript compilation
2. **Linting** - ESLint for code quality
3. **Testing** - Run test suite
4. **Build optimization** - Next.js production build
5. **Deployment** - Vercel automatic deployment
6. **Database migrations** - Prisma migration deployment

This specification provides a comprehensive foundation for developing the ShortPoint Standalone SaaS application with modern, scalable architecture patterns.
