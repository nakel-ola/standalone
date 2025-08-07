# UI/UX Design Standards
*ShortPoint Standalone - Design System and Interface Guidelines*

## Design Philosophy

### Core Principles
- **Mobile-first responsive design** with progressive enhancement
- **Accessibility-first approach** with WCAG 2.1 AA compliance
- **Consistent visual language** across all interfaces
- **Intuitive navigation patterns** for multi-level hierarchy
- **Clean, modern aesthetic** focusing on usability over decoration

### User Experience Guidelines
- **Progressive disclosure** - show basic info first, expand for details
- **Contextual interactions** - actions available when relevant
- **Immediate feedback** - visual response to all user actions
- **Forgiving interfaces** - undo capabilities and confirmation dialogs
- **Consistent patterns** - predictable behavior across components

## ShortPoint Design System

### 🎨 Color Palette

#### Primary Colors
```css
--primary-blue: #3161D1      /* Main brand color, primary actions */
--secondary-blue: #5774a8    /* Secondary text and subtle elements */
--light-blue: #E7F5FF        /* Active states and highlights */
--border-blue: #deefff       /* Subtle blue borders */
```

#### Background Colors
```css
--main-background: #f5f6fa   /* Dashboard and main application background */
--card-background: #ffffff   /* White background for cards and panels */
--sidebar-background: #ffffff /* White background for sidebar navigation */
```

#### Text Colors
```css
--primary-text: #202224      /* Main text for headings and important content */
--subtle-text: #5774a8       /* Secondary text for descriptions */
--brand-text: #3161d1        /* Text for brand elements and links */
--neutral-text: #607CAD      /* Neutral text for body content */
--placeholder-text: #ADB5BD  /* Gray placeholder text */
```

#### Border Colors
```css
--light-border: #eaeaea      /* Light gray border for subtle separations */
--blue-border: #deefff       /* Blue border for active states and focus */
```

### 📝 Typography System

#### Font Families
- **Inter**: Primary font for UI elements and headings
- **Roboto**: Secondary font for body text and descriptions
- **Euclid Circular A**: Specialized font for certain UI elements

#### Font Sizes & Usage
```css
--font-xs: 14px     /* Small text, captions, metadata */
--font-sm: 16px     /* Body text, default size */
--font-md: 18px     /* Larger body text, subtitles */
--font-lg: 32px     /* Headings, page titles */
```

#### Font Weights
```css
--font-regular: 400    /* Default text weight */
--font-medium: 500     /* Medium emphasis text */
--font-semibold: 600   /* Strong emphasis, headings */
```

#### Line Heights
```css
--line-tight: 16px     /* Compact line spacing for small text */
--line-normal: 18px    /* Standard line spacing for body text */
--line-relaxed: 42px   /* Spacious line spacing for headings */
```

### 🏗️ Layout Structure

#### Application Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Header Bar (Platform branding, search, user profile)       │
├─────────────┬───────────────────────────────────────────────┤
│             │ Main Content Area                             │
│ Left        │ ┌─────────────────────────────────────────┐   │
│ Sidebar     │ │ Horizontal Navigation Bar (Site Level) │   │
│ (230px)     │ ├─────────────────────────────────────────┤   │
│             │ │ Content Section                         │   │
│ Navigation  │ │ (Pages, Assets, Settings, etc.)        │   │
│ Menu        │ │                                         │   │
│             │ └─────────────────────────────────────────┘   │
│             │                                               │
└─────────────┴───────────────────────────────────────────────┘
```

#### Responsive Breakpoints
```css
/* Mobile First Approach */
--mobile: 320px to 767px     /* Single column, full-screen modals */
--tablet: 768px to 1199px    /* Collapsible sidebar, condensed views */
--desktop: 1200px+           /* Full layout, hover interactions */
```

### 🧩 Component Standards

#### Navigation Components

**Left Sidebar Navigation**
```css
/* Specifications */
width: 230px
background: var(--sidebar-background)
border-right: 1px solid var(--light-border)

/* Active State */
background: var(--light-blue)
color: var(--primary-blue)
border-radius: 0px /* No border radius */

/* Non-Active State */
color: var(--secondary-blue)
background: transparent

/* Hover State */
background: var(--light-blue) /* 50% opacity */
color: var(--primary-blue)

/* Typography */
font-size: 12px
line-height: 14px
font-family: Inter
```

**Horizontal Site Navigation**
- Configurable navigation bar managed through site settings
- Appears in main content area below header
- Color and styling customizable through Site Theme settings
- Persistent across all site pages

#### Data Display Components

**Site Cards**
```css
/* Card Container */
background: var(--card-background)
border: 1px solid var(--light-border)
border-radius: 8px
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
padding: 24px
margin: 16px

/* Card Content */
font-family: Inter
color: var(--primary-text)
```

**Data Tables**
```css
/* Table Headers */
background: var(--main-background)
color: var(--subtle-text)
font-weight: var(--font-medium)
font-size: var(--font-xs)

/* Table Rows */
border-bottom: 1px solid var(--light-border)
color: var(--primary-text)
font-size: var(--font-sm)

/* Action Buttons */
min-height: 32px
padding: 8px 16px
border-radius: 4px
```

#### Interactive Elements

**Buttons**
```css
/* Primary Button */
background: var(--primary-blue)
color: white
border-radius: 6px
padding: 12px 24px
font-weight: var(--font-medium)
min-height: 44px /* Accessibility requirement */

/* Secondary Button */
background: transparent
color: var(--primary-blue)
border: 1px solid var(--primary-blue)

/* Hover States */
transform: translateY(-1px)
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15)
```

**Form Inputs**
```css
/* Input Fields */
border: 1px solid var(--light-border)
border-radius: 4px
padding: 12px 16px
font-size: var(--font-sm)
background: var(--card-background)

/* Focus State */
border-color: var(--primary-blue)
box-shadow: 0 0 0 3px var(--light-blue)
outline: none

/* Error State */
border-color: #dc3545
background: #fff5f5
```

### 🖼️ Branding Guidelines

#### Logo Usage
```html
<!-- Application Logo -->
<img src="/public/shortpoint-logo.svg" 
     alt="ShortPoint" 
     width="160" 
     height="32" />
```

**Logo Specifications:**
- Location: `/public/shortpoint-logo.svg`
- Sidebar dimensions: 160px width, 32px height
- Format: SVG for scalability
- Primary colors: `#3161D1` and `#474F65`
- Links to main dashboard when clicked

### 📱 Responsive Design Standards

#### Mobile (320px - 767px)
- **Full-screen modals** for editing and detailed views
- **Stacked layouts** with single-column arrangements
- **Bottom navigation** for primary actions when appropriate
- **Swipe gestures** for navigation and content management
- **Condensed data tables** with expand/collapse functionality

#### Tablet (768px - 1199px)
- **Collapsible sidebar** with hamburger menu toggle
- **Condensed table views** with horizontal scrolling if needed
- **Touch-optimized controls** with larger tap targets
- **Simplified navigation** with essential items prioritized

#### Desktop (1200px+)
- **Full sidebar visible** with complete navigation labels
- **Multi-column layouts** for efficient space utilization
- **Hover interactions** and tooltips for enhanced UX
- **Large click targets** (minimum 44px) for all interactive elements

### ♿ Accessibility Standards

#### Color & Contrast
- **WCAG AA compliance** with minimum 4.5:1 contrast ratio for normal text
- **WCAG AAA compliance** for important UI elements (7:1 contrast ratio)
- **Color-blind friendly** palette with sufficient contrast differences
- **No color-only indicators** - always paired with text or icons

#### Keyboard Navigation
- **Full keyboard accessibility** with logical tab order
- **Visible focus indicators** with clear blue outline
- **Skip links** for main content areas
- **Keyboard shortcuts** for common actions (Ctrl+S for save, etc.)

#### Screen Reader Support
- **Semantic HTML** structure with proper heading hierarchy
- **ARIA labels** and descriptions for interactive elements
- **Alt text** for all images and icons
- **Live regions** for dynamic content updates
- **Form labels** properly associated with inputs

### 🎯 Interaction Patterns

#### Navigation Patterns
- **Single-click navigation** for primary menu items
- **Hover states** on interactive elements with subtle color changes
- **Active state indicators** for current page/section (blue accent)
- **Drag-and-drop functionality** for navigation reordering

#### Content Management Patterns
- **Inline editing** capabilities for quick content updates
- **Modal dialogs** for confirmations and detailed editing
- **Auto-save functionality** for form inputs and content editing
- **Version history access** through dedicated panels

#### Feedback Patterns
- **Loading states** with progress indicators
- **Success/error messages** with appropriate colors and icons
- **Confirmation dialogs** for destructive actions
- **Toast notifications** for non-blocking feedback

### 🛠️ Component Implementation

#### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3161D1',
        'secondary-blue': '#5774a8',
        'light-blue': '#E7F5FF',
        'border-blue': '#deefff',
        'main-bg': '#f5f6fa',
        'card-bg': '#ffffff',
        'primary-text': '#202224',
        'subtle-text': '#5774a8',
        'brand-text': '#3161d1',
        'neutral-text': '#607CAD',
        'placeholder-text': '#ADB5BD',
        'light-border': '#eaeaea'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'euclid': ['Euclid Circular A', 'sans-serif']
      },
      fontSize: {
        'xs': '14px',
        'sm': '16px', 
        'md': '18px',
        'lg': '32px'
      },
      spacing: {
        'sidebar': '230px'
      }
    }
  }
}
```

#### Component Structure
```typescript
// Example: Navigation Menu Item
interface NavigationItemProps {
  label: string
  href: string
  isActive?: boolean
  icon?: React.ReactNode
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  label, 
  href, 
  isActive, 
  icon 
}) => {
  return (
    <Link
      href={href}
      className={`
        flex items-center px-4 py-3 text-xs
        font-inter leading-tight
        transition-colors duration-200
        ${isActive 
          ? 'bg-light-blue text-primary-blue' 
          : 'text-secondary-blue hover:bg-light-blue/50 hover:text-primary-blue'
        }
      `}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {label}
    </Link>
  )
}
```

### 📋 Design Checklist

Before implementing any new component:
- [ ] Colors use design system variables
- [ ] Typography follows established scale
- [ ] Interactive elements have 44px minimum touch target
- [ ] Focus states are visible and accessible
- [ ] Component works across all breakpoints
- [ ] ARIA labels and semantic HTML are used
- [ ] Hover and active states are defined
- [ ] Loading and error states are handled
- [ ] Component follows naming conventions
- [ ] Documentation is updated

This design system ensures consistent, accessible, and professional interfaces across the ShortPoint Standalone application.
