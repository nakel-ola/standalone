# Cursor Rules Index
*ShortPoint Standalone - Development Guidelines and Standards*

This directory contains cursor rules that provide development guidelines, patterns, and standards for the ShortPoint Standalone SaaS intranet project. These rules help maintain consistency, quality, and efficiency throughout the development process.

## Available Rules

### 🗄️ Database & Data Management
- **`database-schema-specification.md`** - Complete database schema design, entity relationships, and data isolation patterns for the multi-tenant architecture
- **`database-integration-best-practises.mdc`** - General database integration best practices and guidelines

### 🏗️ Architecture & Technical Standards  
- **`architecture-technical-stack.md`** - System architecture patterns, technology stack specifications, and development workflows

### 🎨 UI/UX Design Standards
- **`ui-ux-design-standards.md`** - Complete design system including colors, typography, components, accessibility standards, and responsive design patterns

### 🔌 API & Backend Patterns
- **`api-design-patterns.md`** - RESTful API design standards, authentication patterns, error handling, and request/response formats

### 🎯 Development Modes
- **`initial-design-mode.mdc`** - Guidelines for prototyping phase with focus on frontend development using mock data

## How to Use These Rules

### For Cursor AI Assistant
These rules are automatically available to the Cursor AI assistant. When working on specific features, the AI will reference relevant rules to ensure consistency with project standards.

### For Developers
1. **Read the relevant rule** before starting work on a feature
2. **Follow the patterns and standards** outlined in each rule
3. **Update rules** when patterns evolve or new standards are established
4. **Reference rules** during code reviews to ensure compliance

## Rule Application Guidelines

### When to Apply Each Rule

- **Database Schema**: Apply when creating/modifying database tables, relationships, or queries
- **Architecture**: Apply for system design decisions, technology choices, and overall structure
- **UI/UX Design**: Apply when building components, styling, or user interactions
- **API Design**: Apply when creating or modifying API endpoints, authentication, or data flow
- **Initial Design Mode**: Apply during prototyping phase to focus on frontend without backend

### Best Practices

1. **Consistency**: Always follow established patterns from these rules
2. **Documentation**: Update rules when introducing new patterns or standards
3. **Review**: Reference rules during code reviews and pull request evaluations
4. **Evolution**: Rules should evolve with the project - suggest updates when patterns change

## Project Context

**ShortPoint Standalone** is a multi-tenant SaaS intranet solution that allows organizations to create and manage multiple departmental sites with role-based access control. The application focuses on:

- Multi-tenant architecture with data isolation
- Rich content management capabilities
- Responsive, accessible user interfaces
- RESTful API design with proper authentication
- Modern React/Next.js development patterns

## Maintenance

These rules are living documents that should be updated as the project evolves. When contributing:

1. Keep rules current with actual implementation
2. Add examples and code snippets for clarity
3. Update cross-references between related rules
4. Maintain consistent formatting and structure

---

*Last updated: Created from .documentation folder specifications*
