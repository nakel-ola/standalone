# Database Schema Documentation

This document outlines the database schema for the multi-tenant website management system.

## Table of Contents

- [Channels](#channels)
- [Users](#users)
- [Sites](#sites)
- [Pages](#pages)
- [Templates](#templates)
- [Entity Relationships](#entity-relationships)

## Channels

The `channels` table stores information about different tenant channels/organizations.

| Field | Type | Description |
|-------|------|-------------|
| `tenant_name` | String | Name of the channel |
| `tenant_domain_url` | String | Domain URL of the channel |
| `channel_description` | Text | Description of the channel |
| `channel_created_at` | Timestamp | Timestamp of the channel creation |
| `channel_updated_at` | Timestamp | Timestamp of the channel update |

## Users

The `users` table stores user account information.

| Field | Type | Description |
|-------|------|-------------|
| `first_name` | String | First name of user |
| `last_name` | String | Last name of user |
| `email` | String | User email address |
| `password` | String | Encrypted and hashed password (following industry best standards) |
| `is_admin` | Boolean | Indicates if user has admin privileges |
| `channel_id` | Integer | Foreign key to the channels table |

## Sites

The `sites` table stores website information for each channel.

| Field | Type | Description |
|-------|------|-------------|
| `site_name` | String | Name of the site |
| `site_description` | Text | Description of the site |
| `site_url` | String | URL of the site |
| `site_status` | Enum | Site status: `published`, `draft`, or `archived` |
| `site_logo` | String | URL of the site logo |
| `site_favicon` | String | URL of the site favicon |
| `channel_id` | Integer | Foreign key to the channels table |
| `site_created_at` | Timestamp | Timestamp of the site creation |
| `site_updated_at` | Timestamp | Timestamp of the site update |

## Pages

The `pages` table stores individual page content for each site.

| Field | Type | Description |
|-------|------|-------------|
| `page_name` | String | Name of the page |
| `page_description` | Text | Description of the page |
| `page_created_at` | Timestamp | Timestamp of the page creation |
| `page_updated_at` | Timestamp | Timestamp of the page update |
| `site_id` | Integer | Foreign key to the sites table |
| `page_content` | Text | Content of the page |
| `page_status` | Enum | Page status: `published`, `draft`, or `archived` |
| `page_order` | Integer | Display order for navigation menu |

## Templates

The `templates` table stores reusable templates for sites.

| Field | Type | Description |
|-------|------|-------------|
| `template_name` | String | Name of the template |
| `template_description` | Text | Description of the template |
| `template_created_at` | Timestamp | Timestamp of the template creation |
| `template_updated_at` | Timestamp | Timestamp of the template update |
| `template_content` | Text | Template content/code |

## Entity Relationships

### One-to-Many Relationships

1. **Channels → Users**: A channel can have multiple users
2. **Channels → Sites**: A channel can have multiple sites  
3. **Sites → Pages**: A site can have multiple pages
4. **Sites → Templates**: A site can have multiple templates

### Relationship Diagram

```
Channels (1) ──→ (∞) Users
    │
    └── (1) ──→ (∞) Sites (1) ──→ (∞) Pages
                        │
                        └── (1) ──→ (∞) Templates
```