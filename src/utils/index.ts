import { MenuItem } from '@/types';

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Espresso', price: 80, category: 'Coffee', description: 'Single shot' },
  { id: '2', name: 'Cappuccino', price: 120, category: 'Coffee', description: 'With milk foam' },
  { id: '3', name: 'Latte', price: 140, category: 'Coffee', description: 'Smooth and creamy' },
  { id: '4', name: 'Americano', price: 100, category: 'Coffee', description: 'Long black' },
  { id: '5', name: 'Croissant', price: 100, category: 'Pastries', description: 'Butter croissant' },
  { id: '6', name: 'Muffin', price: 90, category: 'Pastries', description: 'Chocolate chip' },
  { id: '7', name: 'Sandwich', price: 180, category: 'Food', description: 'Ham and cheese' },
  { id: '8', name: 'Iced Tea', price: 80, category: 'Beverages', description: 'Refreshing' },
];

const STORAGE_KEY = 'cafe_menu_items';
const TAX_RATE = 0.08;

export function getMenuItems(): MenuItem[] {
  if (typeof window === 'undefined') return DEFAULT_MENU_ITEMS;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_MENU_ITEMS;
}

export function saveMenuItems(items: MenuItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function generateBillId(): string {
  return 'BILL-' + Date.now().toString(36).toUpperCase();
}
