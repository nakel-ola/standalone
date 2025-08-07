# Database Schema Specification
*ShortPoint Standalone - Multi-tenant SaaS Intranet Database Design*

## Core Principles
- **Multi-tenant architecture** with tenant-level data isolation via foreign keys
- **Hierarchical structure**: Companies → Tenants → Sites → Pages/Assets
- **UUID primary keys** for all tables to ensure global uniqueness
- **Comprehensive audit trails** with created_at/updated_at timestamps
- **Version control** for page content with complete change history

## Database Tables & Schema

### Core Entity Tables

**companies**
```sql
- id (UUID, Primary Key)
- name (String) - Company name
- slug (String, Unique) - URL-friendly identifier
- industry (String) - Business industry classification
- website (String) - Company website URL
- created_at (Timestamp)
- updated_at (Timestamp)
```

**tenants**
```sql
- id (UUID, Primary Key)
- name (String) - Tenant display name
- slug (String, Unique) - URL-friendly identifier
- company_id (UUID, Foreign Key → companies.id)
- created_at (Timestamp)
- updated_at (Timestamp)
```

**users**
```sql
- id (UUID, Primary Key)
- clerk_id (String, Unique) - Clerk authentication ID
- email (String, Unique) - User email address
- role (Enum: ADMIN, NORMAL) - User permission level
- tenant_id (UUID, Foreign Key → tenants.id)
- created_at (Timestamp)
```

**sites**
```sql
- id (UUID, Primary Key)
- name (String) - Site display name
- slug (String) - URL-friendly identifier (unique per tenant)
- description (Text) - Site description
- tenant_id (UUID, Foreign Key → tenants.id)
- created_by (UUID, Foreign Key → users.id)
- created_at (Timestamp)
- updated_at (Timestamp)
```

**pages**
```sql
- id (UUID, Primary Key)
- title (String) - Page title
- slug (String) - URL-friendly identifier (unique per site)
- content (JSON) - Rich text page content
- status (Enum: DRAFT, PUBLISHED, ARCHIVED)
- site_id (UUID, Foreign Key → sites.id)
- tenant_id (UUID, Foreign Key → tenants.id) - For data isolation
- created_by (UUID, Foreign Key → users.id)
- created_at (Timestamp)
- updated_at (Timestamp)
```

**page_versions**
```sql
- id (UUID, Primary Key)
- page_id (UUID, Foreign Key → pages.id)
- version_number (Integer) - Incremental version counter
- title (String) - Page title at this version
- content (JSON) - Rich text content at this version
- status (Enum: DRAFT, PUBLISHED, ARCHIVED)
- created_by (UUID, Foreign Key → users.id)
- created_at (Timestamp)
- is_current (Boolean) - Indicates current active version
```

**navigation**
```sql
- id (UUID, Primary Key)
- site_id (UUID, Foreign Key → sites.id)
- tenant_id (UUID, Foreign Key → tenants.id) - For data isolation
- structure (JSON) - Navigation menu structure and hierarchy
- updated_at (Timestamp)
```

**assets**
```sql
- id (UUID, Primary Key)
- name (String) - Original file name
- file_path (String) - Storage path/URL
- file_type (String) - MIME type
- file_size (Integer) - File size in bytes
- site_id (UUID, Foreign Key → sites.id)
- tenant_id (UUID, Foreign Key → tenants.id) - For data isolation
- uploaded_by (UUID, Foreign Key → users.id)
- created_at (Timestamp)
```

**themes**
```sql
- id (UUID, Primary Key)
- site_id (UUID, Foreign Key → sites.id)
- tenant_id (UUID, Foreign Key → tenants.id) - For data isolation
- primary_color (String) - Hex color code
- secondary_color (String) - Hex color code
- custom_css (Text) - Additional CSS customizations
- updated_at (Timestamp)
```

### Licensing & Permission Tables

**tenant_licenses**
```sql
- id (UUID, Primary Key)
- tenant_id (UUID, Foreign Key → tenants.id)
- license_type (Enum: BASIC, PREMIUM, ENTERPRISE)
- max_sites (Integer) - Site creation limit
- max_users (Integer) - User limit
- max_storage_gb (Integer) - Storage limit in GB
- start_date (Date) - License start date
- end_date (Date) - License expiration date
- is_active (Boolean) - License status
- created_at (Timestamp)
- updated_at (Timestamp)
```

**site_users** (Many-to-Many Relationship)
```sql
- site_id (UUID, Foreign Key → sites.id)
- user_id (UUID, Foreign Key → users.id)
- role (Enum: ADMIN, MEMBER) - Site-specific role
- created_at (Timestamp)
```

## Entity Relationships

### Primary Relationships
- **companies** → **tenants** (One-to-Many)
- **tenants** → **tenant_licenses** (One-to-Many)
- **tenants** → **users** (One-to-Many)
- **tenants** → **sites** (One-to-Many)
- **tenants** → **pages** (One-to-Many) - For data isolation
- **tenants** → **assets** (One-to-Many) - For data isolation
- **tenants** → **navigation** (One-to-Many) - For data isolation
- **tenants** → **themes** (One-to-Many) - For data isolation
- **sites** → **pages** (One-to-Many)
- **pages** → **page_versions** (One-to-Many)
- **sites** → **assets** (One-to-Many)
- **sites** → **navigation** (One-to-One)
- **sites** → **themes** (One-to-One)
- **sites** ↔ **users** (Many-to-Many via site_users)

## Data Isolation Strategy

### Tenant-Level Isolation
- ALL content tables include `tenant_id` foreign key
- ALL database queries MUST filter by tenant_id
- NO cross-tenant data access permitted
- Middleware enforces tenant filtering on all database operations

### Query Patterns
```typescript
// ✅ CORRECT: Always include tenant filtering
const pages = await prisma.page.findMany({
  where: {
    tenant_id: user.tenant_id,
    site_id: siteId
  }
})

// ❌ INCORRECT: Missing tenant isolation
const pages = await prisma.page.findMany({
  where: { site_id: siteId }
})
```

### Authentication Integration
- Users automatically assigned to tenants via email domain matching
- Clerk webhook creates user records with proper tenant assignment
- JWT tokens include tenant_id for request context

## Development Guidelines

### Database Migrations
- Use Prisma migrations for all schema changes
- Include proper indexes for tenant_id filtering
- Test migration rollback procedures
- Document breaking changes and migration dependencies

### Performance Optimization
- Index all foreign key columns
- Composite indexes for common query patterns (tenant_id + site_id)
- JSON field indexing for content search capabilities
- Consider read replicas for reporting queries

### Data Validation
- Enforce referential integrity at database level
- Use enums for status fields to prevent invalid values
- Validate JSON schemas for content and navigation structure
- Implement soft deletes for audit trail preservation

### Backup & Recovery
- Regular automated backups with point-in-time recovery
- Tenant-specific backup and restore capabilities
- Test restore procedures regularly
- Document data retention policies

## Security Considerations

### Data Protection
- Encrypt sensitive data at rest
- Use secure random UUIDs for primary keys
- Implement proper SQL injection protection via ORM
- Regular security audits of database access patterns

### Access Control
- Row-level security policies for tenant isolation
- Database user permissions follow principle of least privilege
- API-level authorization before database queries
- Audit logging for all data modifications

## Legacy Schema Compatibility

The original schema design included these tables which map to the current implementation:

**Original → Current Mapping:**
- `channels` → `tenants` (renamed for clarity)
- All field naming converted to snake_case for consistency
- Enhanced with licensing, versioning, and asset management
- Added comprehensive audit trails and timestamps

This specification ensures a robust, scalable, and secure database foundation for the ShortPoint Standalone multi-tenant SaaS platform.
