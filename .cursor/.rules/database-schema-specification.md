# Database Schema Specification Rule

This rule defines the database schema requirements and best practices for the multi-tenant website management system.

## Database Schema Overview

The application follows a multi-tenant architecture with the following core entities:

### Entity Hierarchy
```
Channels (Tenants) 
    ↓ (1:many)
├── Users
└── Sites
    ↓ (1:many)
    ├── Pages
    └── Templates
```

## Table Specifications

### 1. Channels Table (Primary Tenant Entity)
**Purpose**: Stores tenant/organization information

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | String | Primary Key, CUID | Unique channel identifier |
| `tenant_name` | String | Required | Name of the channel/organization |
| `tenant_domain_url` | String | Required, Unique | Domain URL of the channel |
| `channel_description` | Text | Optional | Description of the channel |
| `channel_created_at` | Timestamp | Auto-generated | Channel creation timestamp |
| `channel_updated_at` | Timestamp | Auto-updated | Channel update timestamp |

**Prisma Model Example**:
```prisma
model Channel {
  id                  String   @id @default(cuid())
  tenant_name         String
  tenant_domain_url   String   @unique
  channel_description String?
  channel_created_at  DateTime @default(now())
  channel_updated_at  DateTime @updatedAt
  
  // Relations
  users     User[]
  sites     Site[]
  
  @@map("channels")
}
```

### 2. Users Table
**Purpose**: Stores user account information with tenant association

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | String | Primary Key, CUID | Unique user identifier |
| `first_name` | String | Required | User's first name |
| `last_name` | String | Required | User's last name |
| `email` | String | Required, Unique | User email address |
| `password` | String | Required, Hashed | Encrypted password (industry standard) |
| `is_admin` | Boolean | Default: false | Admin privileges flag |
| `channel_id` | String | Foreign Key | Reference to channels table |
| `created_at` | Timestamp | Auto-generated | User creation timestamp |
| `updated_at` | Timestamp | Auto-updated | User update timestamp |

**Prisma Model Example**:
```prisma
model User {
  id         String   @id @default(cuid())
  first_name String
  last_name  String
  email      String   @unique
  password   String   // Always hash with bcrypt or similar
  is_admin   Boolean  @default(false)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  
  // Relations
  channel_id String
  channel    Channel @relation(fields: [channel_id], references: [id])
  
  @@map("users")
}
```

### 3. Sites Table
**Purpose**: Stores website information for each channel

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | String | Primary Key, CUID | Unique site identifier |
| `site_name` | String | Required | Name of the site |
| `site_description` | Text | Optional | Description of the site |
| `site_url` | String | Required | URL of the site |
| `site_status` | Enum | Required | Status: published, draft, archived |
| `site_logo` | String | Optional | URL of the site logo |
| `site_favicon` | String | Optional | URL of the site favicon |
| `channel_id` | String | Foreign Key | Reference to channels table |
| `site_created_at` | Timestamp | Auto-generated | Site creation timestamp |
| `site_updated_at` | Timestamp | Auto-updated | Site update timestamp |

**Prisma Model Example**:
```prisma
model Site {
  id               String     @id @default(cuid())
  site_name        String
  site_description String?
  site_url         String
  site_status      SiteStatus @default(DRAFT)
  site_logo        String?
  site_favicon     String?
  site_created_at  DateTime   @default(now())
  site_updated_at  DateTime   @updatedAt
  
  // Relations
  channel_id String
  channel    Channel @relation(fields: [channel_id], references: [id])
  pages      Page[]
  templates  Template[]
  
  @@map("sites")
}

enum SiteStatus {
  PUBLISHED
  DRAFT
  ARCHIVED
}
```

### 4. Pages Table
**Purpose**: Stores individual page content for each site

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | String | Primary Key, CUID | Unique page identifier |
| `page_name` | String | Required | Name of the page |
| `page_description` | Text | Optional | Description of the page |
| `page_content` | Text | Optional | Content of the page |
| `page_status` | Enum | Required | Status: published, draft, archived |
| `page_order` | Integer | Required | Navigation menu display order |
| `site_id` | String | Foreign Key | Reference to sites table |
| `page_created_at` | Timestamp | Auto-generated | Page creation timestamp |
| `page_updated_at` | Timestamp | Auto-updated | Page update timestamp |

**Prisma Model Example**:
```prisma
model Page {
  id               String     @id @default(cuid())
  page_name        String
  page_description String?
  page_content     String?    @db.Text
  page_status      PageStatus @default(DRAFT)
  page_order       Int
  page_created_at  DateTime   @default(now())
  page_updated_at  DateTime   @updatedAt
  
  // Relations
  site_id String
  site    Site   @relation(fields: [site_id], references: [id])
  
  @@map("pages")
}

enum PageStatus {
  PUBLISHED
  DRAFT
  ARCHIVED
}
```

### 5. Templates Table
**Purpose**: Stores reusable templates for sites

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | String | Primary Key, CUID | Unique template identifier |
| `template_name` | String | Required | Name of the template |
| `template_description` | Text | Optional | Description of the template |
| `template_content` | Text | Required | Template content/code |
| `site_id` | String | Foreign Key | Reference to sites table |
| `template_created_at` | Timestamp | Auto-generated | Template creation timestamp |
| `template_updated_at` | Timestamp | Auto-updated | Template update timestamp |

**Prisma Model Example**:
```prisma
model Template {
  id                   String   @id @default(cuid())
  template_name        String
  template_description String?
  template_content     String   @db.Text
  template_created_at  DateTime @default(now())
  template_updated_at  DateTime @updatedAt
  
  // Relations
  site_id String
  site    Site   @relation(fields: [site_id], references: [id])
  
  @@map("templates")
}
```

## Development Rules & Best Practices

### 1. Database Operations
- **Always include tenant isolation**: Every query must filter by `channel_id` where applicable
- **Use transactions**: For multi-table operations, always use database transactions
- **Validate ownership**: Before any operation, verify user has access to the channel/site
- **Soft deletes**: Consider implementing soft deletes for important entities

### 2. API Development
```typescript
// Example API structure for tenant-aware operations
export async function getSites(channelId: string, userId: string) {
  // 1. Verify user belongs to channel
  const user = await prisma.user.findFirst({
    where: { id: userId, channel_id: channelId }
  });
  
  if (!user) throw new Error('Unauthorized');
  
  // 2. Fetch sites for the channel
  return await prisma.site.findMany({
    where: { channel_id: channelId },
    include: { pages: true, templates: true }
  });
}
```

### 3. Type Safety
```typescript
// Define strict types based on schema
interface Channel {
  id: string;
  tenant_name: string;
  tenant_domain_url: string;
  channel_description?: string;
  channel_created_at: Date;
  channel_updated_at: Date;
}

interface CreateSiteData {
  site_name: string;
  site_description?: string;
  site_url: string;
  site_status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  channel_id: string;
}
```

### 4. Security Requirements
- **Password Hashing**: Always use bcrypt or similar for password hashing
- **Input Validation**: Validate all inputs using Zod schemas
- **SQL Injection Prevention**: Use Prisma's parameterized queries
- **Authorization**: Implement role-based access control using `is_admin` field

### 5. Performance Optimization
- **Indexing**: Add database indexes on foreign keys and frequently queried fields
- **Pagination**: Implement cursor-based pagination for large datasets
- **Caching**: Consider Redis caching for frequently accessed data
- **Select Fields**: Only select required fields in queries

### 6. Migration Strategy
- **Version Control**: All schema changes must be versioned in Prisma migrations
- **Backwards Compatibility**: Ensure migrations don't break existing data
- **Rollback Plan**: Always have a rollback strategy for schema changes

## Relationship Enforcement Rules

### Foreign Key Constraints
1. **Users.channel_id** → **Channels.id** (CASCADE on delete)
2. **Sites.channel_id** → **Channels.id** (CASCADE on delete)  
3. **Pages.site_id** → **Sites.id** (CASCADE on delete)
4. **Templates.site_id** → **Sites.id** (CASCADE on delete)

### Business Logic Constraints
- Users can only access sites within their channel
- Pages inherit the channel context from their parent site
- Templates are site-specific and cannot be shared across sites
- Admin users have full access within their channel

## Error Handling Patterns

```typescript
// Standard error responses for database operations
class DatabaseError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

// Usage in API routes
try {
  const result = await databaseOperation();
  return result;
} catch (error) {
  if (error.code === 'P2002') {
    throw new DatabaseError('Unique constraint violation', 'DUPLICATE_ENTRY');
  }
  throw new DatabaseError('Database operation failed', 'DB_ERROR');
}
```

## Testing Requirements

1. **Unit Tests**: Test all database operations with proper tenant isolation
2. **Integration Tests**: Test complete user flows across multiple entities
3. **Security Tests**: Verify unauthorized access is properly blocked
4. **Performance Tests**: Ensure queries perform well with large datasets

This schema specification ensures data integrity, security, and scalability for the multi-tenant website management system.
