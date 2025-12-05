# Cafe Billing System

A modern, full-featured cafe billing management system built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Create Bills**: Quickly generate bills with multiple items, quantities, and automatic tax calculation
- **Manage Menu**: Add, edit, and delete menu items with categories and descriptions
- **Print Bills**: Print formatted bills for customers
- **Persistent Storage**: Menu items are saved to browser's local storage
- **Tax Calculation**: Automatic 8% tax calculation on all bills
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## Project Structure

```
cafe-billing-system/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Main page with tabs
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── BillingForm.tsx    # Bill creation interface
│   │   ├── BillDisplay.tsx    # Receipt display
│   │   └── MenuManager.tsx    # Menu management
│   ├── types/            # TypeScript interfaces
│   │   └── index.ts      # Bill, MenuItem types
│   └── utils/            # Helper functions
│       └── index.ts      # Calculations and formatting
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration with React Compiler
├── tailwind.config.ts    # Tailwind CSS config
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd project_1
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Creating a Bill
1. Click the "Create Bill" tab
2. Enter customer name (optional)
3. Click on menu items to add them to the bill
4. Adjust quantities using +/- buttons or direct input
5. Click "Generate Bill" to create the receipt
6. Click "Print Bill" to print or save as PDF

### Managing Menu Items
1. Click the "Manage Menu" tab
2. Fill in item details (Name, Price, Category, Description)
3. Click "Add Item" to add to menu
4. Edit prices directly in the list
5. Click "Delete" to remove items

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Autoprefixer
- **Compiler**: React Compiler for optimized rendering
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage API

## Key Features

### React Compiler Integration
The project uses React Compiler (configured in next.config.js) for automatic optimization of React code, improving performance without manual memoization.

### Type Safety
Full TypeScript support ensures type safety throughout the application, reducing runtime errors and improving developer experience.

### Responsive UI
Tailwind CSS provides a modern, responsive design that works across all devices.

### Local Storage
Menu items persist in the browser's local storage, allowing customization between sessions.

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### File Organization

Each component is self-contained with clear separation of concerns:
- Components handle UI and user interaction
- Types define data structures
- Utils handle business logic and calculations

## Notes for College Project

This is a practical, industry-ready project that demonstrates:
- Modern React patterns (hooks, functional components)
- TypeScript best practices
- Component-based architecture
- State management
- CSS utility framework usage
- Professional UI/UX design

Perfect for showcasing software engineering principles and full-stack web development skills.

## Future Enhancements

- Database integration for persistent bill history
- Authentication and user management
- Reporting and analytics dashboard
- Multiple payment method support
- Inventory tracking
- Order history and statistics

---

Created for Computer Science Third Year Project
