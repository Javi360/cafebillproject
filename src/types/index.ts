export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

export interface BillItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Bill {
  id: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  customerName?: string;
}
