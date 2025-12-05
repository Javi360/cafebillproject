# Cafe Billing System - Development Guidelines

## Project Overview

This is a cafe billing management system built with Next.js and React, designed as a college CS third-year project. The system allows users to:

- Create and manage customer bills
- Add/edit menu items
- Calculate totals with tax
- Print bills
- Persist data using browser storage

## Development Setup

### Initial Setup
1. Install Node.js 18+ from https://nodejs.org
2. Clone/extract the project
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Open http://localhost:3000 in your browser

## Code Structure

### Component Hierarchy
```
app/page.tsx (Main Component)
├── BillingForm (Create bills)
└── BillDisplay (Show receipt)
    └── MenuManager (Manage items)
```

### Data Flow
1. Menu items are fetched from localStorage
2. BillingForm allows adding items to bill
3. BillDisplay shows the generated bill
4. MenuManager updates menu items in localStorage

## Key Concepts Implemented

### React Patterns
- **Functional Components**: All components use React hooks
- **State Management**: useState for local state
- **Effects**: useEffect for side effects (localStorage sync)
- **Client Components**: 'use client' directive for interactivity

### TypeScript
- Interface definitions for MenuItem and Bill types
- Type-safe component props
- Proper typing for callback functions

### Tailwind CSS
- Utility-first approach for styling
- Responsive grid layouts
- Color theme: Amber/Orange for cafe aesthetic
- Print styles for bill printing

## Important Files to Review

1. **src/types/index.ts** - Data structure definitions
2. **src/utils/index.ts** - Business logic and calculations
3. **src/components/BillingForm.tsx** - Main billing interface
4. **src/app/page.tsx** - Application layout and navigation

## Common Tasks

### Adding a New Menu Category
Edit `src/components/MenuManager.tsx` select element to include new category.

### Changing Tax Rate
Update TAX_RATE constant in `src/utils/index.ts`

### Styling Changes
Modify Tailwind classes in component files or update global styles in `src/app/globals.css`

### Modifying Currency Format
Update `formatCurrency()` function in `src/utils/index.ts`

## Testing the Application

1. **Test Bill Creation**:
   - Add items to bill
   - Verify quantities update correctly
   - Confirm total calculation is accurate

2. **Test Menu Management**:
   - Add new items
   - Edit prices
   - Delete items
   - Verify persistence on page reload

3. **Test Printing**:
   - Generate a bill
   - Click Print Bill
   - Use print preview to verify format

## Deployment Options

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
Create a Dockerfile with Node.js base image and run build/start commands

### Traditional Server
Build with `npm run build` and run `npm start` on server

## Performance Considerations

- React Compiler is enabled for automatic optimization
- LocalStorage is used for fast data access
- No unnecessary re-renders due to proper state management
- Tailwind CSS is minified in production

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Modules not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
Check that all dependencies are installed: `npm install`

## Next Steps for Enhancement

- Add backend API for persistent storage
- Implement user authentication
- Add reporting/analytics features
- Create admin dashboard
- Add payment integration
- Implement inventory management

