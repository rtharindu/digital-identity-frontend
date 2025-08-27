# 🎨 Digital Identity Hub Color Palette

This document contains the complete color palette used throughout the Digital Identity Hub frontend, based on the ConsentHub design system.

## 📋 Table of Contents
- [Primary Brand Colors](#primary-brand-colors)
- [Extended Tailwind Color Scales](#extended-tailwind-color-scales)
- [UI Status Colors](#ui-status-colors)
- [Neutral/Gray Scale](#neutralgray-scale)
- [Special Purpose Colors](#special-purpose-colors)
- [Background Gradients](#background-gradients)
- [Component Classes](#component-classes)
- [Usage Guidelines](#usage-guidelines)

---

## 🏢 Primary Brand Colors

### SLT Mobitel Brand Colors
- **Primary Blue**: `#0072CE` (slt-blue)
- **Primary Blue Hover**: `#005bb5` (slt-blue-hover)
- **Secondary Green**: `#4CAF50` (slt-green)

These are the core brand colors that represent SLT Mobitel identity throughout the application.

---

## 🎯 Extended Tailwind Color Scales

### SLT Blue Custom Scale
```javascript
'slt-blue': {
  50: '#eff6ff',   // Very light blue backgrounds
  100: '#dbeafe',  // Light blue message backgrounds  
  200: '#bfdbfe',  // Subtle blue elements
  300: '#93c5fd',  // Medium light blue
  400: '#60a5fa',  // Medium blue
  500: '#3b82f6',  // Standard blue
  600: '#2563eb',  // Dark blue
  700: '#1d4ed8',  // Darker blue
  800: '#1e40af',  // Very dark blue
  900: '#1e3a8a',  // Darkest blue
  DEFAULT: '#0072CE',
  hover: '#005bb5'
}
```

### SLT Green Custom Scale
```javascript
'slt-green': {
  50: '#f0fdf4',   // Very light green backgrounds
  100: '#dcfce7',  // Light green message backgrounds
  200: '#bbf7d0',  // Subtle green elements
  300: '#86efac',  // Medium light green
  400: '#4ade80',  // Medium green
  500: '#22c55e',  // Standard green (success)
  600: '#16a34a',  // Dark green
  700: '#15803d',  // Darker green
  800: '#166534',  // Very dark green
  900: '#14532d',  // Darkest green
  DEFAULT: '#4CAF50'
}
```

---

## 🚦 UI Status Colors

### ✅ Success/Positive States
| Color | Hex Code | Usage |
|-------|----------|-------|
| Green-50 | `#f0fdf4` | Light success backgrounds |
| Green-100 | `#dcfce7` | Success message backgrounds |
| Green-200 | `#bbf7d0` | Success borders |
| Green-500 | `#22c55e` | Success buttons, positive indicators |
| Green-600 | `#16a34a` | Success hover states |
| Green-700 | `#15803d` | Success text |
| Green-800 | `#166534` | Dark success text |

### ❌ Error/Danger States
| Color | Hex Code | Usage |
|-------|----------|-------|
| Red-50 | `#fef2f2` | Light error backgrounds |
| Red-100 | `#fee2e2` | Error message backgrounds |
| Red-200 | `#fecaca` | Error borders |
| Red-300 | `#fca5a5` | Error input borders |
| Red-500 | `#ef4444` | Error buttons, alerts |
| Red-600 | `#dc2626` | Error text, danger actions |
| Red-700 | `#b91c1c` | Dark error text |
| Red-800 | `#991b1b` | Error headings |

### ⚠️ Warning/Caution States  
| Color | Hex Code | Usage |
|-------|----------|-------|
| Yellow-50 | `#fffbeb` | Light warning backgrounds |
| Yellow-100 | `#fef3c7` | Warning message backgrounds |
| Yellow-200 | `#fde68a` | Warning borders |
| Yellow-500 | `#f59e0b` | Warning indicators |
| Yellow-700 | `#b45309` | Warning text |
| Yellow-800 | `#92400e` | Dark warning text |

### ℹ️ Info/Processing States
| Color | Hex Code | Usage |
|-------|----------|-------|
| Blue-50 | `#eff6ff` | Light info backgrounds |
| Blue-100 | `#dbeafe` | Info message backgrounds |
| Blue-200 | `#bfdbfe` | Info borders |
| Blue-500 | `#3b82f6` | Info buttons, links |
| Blue-600 | `#2563eb` | Info hover states |
| Blue-700 | `#1d4ed8` | Info text |
| Blue-800 | `#1e40af` | Dark info text |

---

## 🔘 Neutral/Gray Scale

| Color | Hex Code | Usage |
|-------|----------|-------|
| Gray-50 | `#f9fafb` | Very light backgrounds, subtle sections |
| Gray-100 | `#f3f4f6` | Light backgrounds, hover states |
| Gray-200 | `#e5e7eb` | Borders, dividers, subtle separators |
| Gray-300 | `#d1d5db` | Input borders, inactive elements |
| Gray-400 | `#9ca3af` | Placeholder text, disabled icons |
| Gray-500 | `#6b7280` | Secondary text, muted content |
| Gray-600 | `#4b5563` | Primary secondary text |
| Gray-700 | `#374151` | Primary text content |
| Gray-800 | `#1f2937` | Dark text, important content |
| Gray-900 | `#111827` | Headings, emphasis text |

---

## 🎨 Special Purpose Colors

### 🟠 Orange (Pending/Processing States)
| Color | Hex Code | Usage |
|-------|----------|-------|
| Orange-50 | `#fff7ed` | Light orange backgrounds |
| Orange-100 | `#ffedd5` | Orange message backgrounds |
| Orange-500 | `#f97316` | Pending indicators, processing states |
| Orange-600 | `#ea580c` | Orange hover states |
| Orange-800 | `#9a3412` | Orange text |

### 🟣 Indigo (Data/Analytics)
| Color | Hex Code | Usage |
|-------|----------|-------|
| Indigo-100 | `#e0e7ff` | Light indigo backgrounds |
| Indigo-600 | `#4f46e5` | Data visualization, analytics buttons |
| Indigo-700 | `#4338ca` | Indigo hover states |
| Indigo-800 | `#3730a3` | Indigo text, data emphasis |

---

## 🌈 Background Gradients

### Primary Gradients
```css
/* Main auth pages gradient */
.auth-background {
  background: linear-gradient(to bottom right, #0072CE, #4CAF50);
}

/* Extended gradient from tailwind config */
.slt-gradient-extended {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #22c55e 100%);
}
```

### Usage in Tailwind
```html
<!-- Auth pages background -->
<div class="auth-background">

<!-- Alternative gradient -->
<div class="bg-slt-gradient">
```

---

## 🧩 Component Classes

### Button Classes
```css
.btn-primary          /* Primary action buttons - SLT Blue */
.btn-secondary        /* Secondary action buttons - SLT Green */
.btn-danger           /* Danger/delete buttons - Red */
.btn-success          /* Success buttons - Green */
.btn-warning          /* Warning buttons - Yellow */
.btn-info             /* Info buttons - Blue */
```

### Form Element Classes
```css
.input-field          /* Standard input styling */
.input-field-error    /* Error state input styling */
```

### Message Classes
```css
.message-success      /* Success messages */
.message-error        /* Error messages */
.message-warning      /* Warning messages */
.message-info         /* Info messages */
```

### Badge Classes
```css
.badge-success        /* Success badges */
.badge-error          /* Error badges */
.badge-warning        /* Warning badges */
.badge-info           /* Info badges */
.badge-pending        /* Pending/processing badges */
```

### Card Classes
```css
.card                 /* Standard card styling */
.card-elevated        /* Elevated card with hover effects */
```

### Table Classes
```css
.table-header         /* Table header styling */
.table-row            /* Table row styling */
.table-cell           /* Table cell styling */
```

---

## 📖 Usage Guidelines

### Primary Actions
- **Background**: `bg-slt-blue` or `btn-primary`
- **Hover**: `hover:bg-slt-blue-hover`
- **Text**: White
- **Focus Ring**: `focus:ring-slt-blue-500`

### Secondary Actions  
- **Background**: `bg-slt-green` or `btn-secondary`
- **Text**: White
- **Hover**: `hover:bg-slt-green-600`

### Status Messages
- **Success**: `message-success` class
- **Error**: `message-error` class
- **Warning**: `message-warning` class
- **Info**: `message-info` class

### Form Elements
- **Default Border**: `border-gray-300`
- **Focus Border**: `border-slt-blue`
- **Error Border**: `border-red-300`
- **Placeholder**: `placeholder-gray-400`

### Navigation
- **Background**: `bg-slt-blue-900`
- **Text**: White
- **Hover**: `hover:text-slt-blue-200`
- **Active**: `nav-link-active` class

### Auth Pages
- **Background**: `auth-background` class
- **Card**: `card-elevated` class

---

## 🔧 Implementation Examples

### Button Examples
```jsx
// Primary button
<button className="btn-primary">Save Changes</button>

// Secondary button
<button className="btn-secondary">Cancel</button>

// Danger button
<button className="btn-danger">Delete Account</button>
```

### Form Examples
```jsx
// Standard input
<input className="input-field" placeholder="Enter your email" />

// Error input
<input className="input-field-error" placeholder="Enter your email" />
```

### Message Examples
```jsx
// Success message
<div className="message-success">Your changes have been saved successfully!</div>

// Error message
<div className="message-error">Please check your input and try again.</div>
```

### Badge Examples
```jsx
// Status badges
<span className="badge-success">Active</span>
<span className="badge-error">Failed</span>
<span className="badge-warning">Pending</span>
<span className="badge-info">Processing</span>
```

---

## 📱 Accessibility Considerations

### Color Contrast Ratios
- **Primary Blue (#0072CE)** on white: ✅ AA compliant
- **Green (#22c55e)** on white: ✅ AA compliant  
- **Red (#ef4444)** on white: ✅ AA compliant
- **Gray-600 (#4b5563)** on white: ✅ AA compliant
- **Gray-700 (#374151)** on white: ✅ AAA compliant

### Best Practices
- Never rely solely on color for information
- Always pair color with icons or text
- Use proper aria-labels and roles
- Provide alternative indicators for status
- Use focus rings for keyboard navigation

---

## 🔄 Migration Notes

### Legacy Color Mappings
The following legacy colors have been mapped to new colors for backward compatibility:
- `mobitel-green` → `slt-green`
- `soft-blue` → `slt-blue-400`
- `dark-blue` → `slt-blue-900`
- `light-gray` → `gray-100`

### Updated Components
- Navigation: Updated to use `slt-blue-900` background
- Auth pages: Updated to use `auth-background` gradient
- Buttons: Updated to use new button classes
- Forms: Updated to use new input classes
- Messages: Updated to use new message classes

---

*This color palette is designed to maintain consistency with SLT Mobitel branding while providing excellent user experience and accessibility compliance.* 