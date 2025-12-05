'use client';

import { useState, useEffect } from 'react';
import { MenuItem, BillItem, Bill } from '@/types';
import { getMenuItems, calculateTax, formatCurrency, generateBillId } from '@/utils';

interface BillingFormProps {
  onBillCreated: (bill: Bill) => void;
}

export default function BillingForm({ onBillCreated }: BillingFormProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    setMenuItems(getMenuItems());
  }, []);

  const addItemToBill = (menuItem: MenuItem) => {
    setBillItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menuItem.id === menuItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { menuItem, quantity: 1 }];
    });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setBillItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== menuItemId));
    } else {
      setBillItems((prevItems) =>
        prevItems.map((item) =>
          item.menuItem.id === menuItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const calculateSubtotal = (): number => {
    return Math.round(
      billItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0) * 100
    ) / 100;
  };

  const handleGenerateBill = () => {
    if (billItems.length === 0) {
      alert('Please add items to the bill');
      return;
    }

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = Math.round((subtotal + tax) * 100) / 100;

    const bill: Bill = {
      id: generateBillId(),
      items: billItems,
      subtotal,
      tax,
      total,
      createdAt: new Date(),
      customerName,
    };

    onBillCreated(bill);
    setBillItems([]);
    setCustomerName('');
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-900 mb-6">Create New Bill</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-900 mb-2">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name (optional)"
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Select Items</h3>
        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => addItemToBill(item)}
              className="text-left p-3 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
            >
              <div className="flex justify-between">
                <span className="font-medium text-amber-900">{item.name}</span>
                <span className="text-amber-700 font-semibold">{formatCurrency(item.price)}</span>
              </div>
              {item.description && (
                <p className="text-sm text-amber-600 mt-1">{item.description}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {billItems.length > 0 && (
        <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-4">Bill Items</h3>
          <div className="space-y-3 mb-4">
            {billItems.map((billItem) => (
              <div key={billItem.menuItem.id} className="flex items-center justify-between bg-white p-3 rounded">
                <span className="text-sm font-medium text-amber-900">{billItem.menuItem.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(billItem.menuItem.id, billItem.quantity - 1)}
                    className="px-2 py-1 bg-amber-200 text-amber-900 rounded hover:bg-amber-300 text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={billItem.quantity}
                    onChange={(e) => updateQuantity(billItem.menuItem.id, parseInt(e.target.value) || 1)}
                    className="w-12 text-center border border-amber-300 rounded"
                  />
                  <button
                    onClick={() => updateQuantity(billItem.menuItem.id, billItem.quantity + 1)}
                    className="px-2 py-1 bg-amber-200 text-amber-900 rounded hover:bg-amber-300 text-sm"
                  >
                    +
                  </button>
                  <span className="text-sm font-semibold text-amber-900 w-24 text-right">
                    {formatCurrency(billItem.menuItem.price * billItem.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-amber-200 pt-4 space-y-2">
            <div className="flex justify-between text-amber-900">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-amber-900">
              <span>Tax (8%):</span>
              <span className="font-semibold">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-amber-900 bg-amber-100 p-2 rounded">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            onClick={handleGenerateBill}
            className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Generate Bill
          </button>
        </div>
      )}
    </div>
  );
}
