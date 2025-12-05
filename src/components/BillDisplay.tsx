'use client';

import { Bill } from '@/types';
import { formatCurrency } from '@/utils';

interface BillDisplayProps {
  bill: Bill | null;
}

export default function BillDisplay({ bill }: BillDisplayProps) {
  if (!bill) {
    return (
      <div className="text-center text-amber-600">
        <p>No bill generated yet. Create a bill to see details here.</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-amber-50 rounded-lg p-8 border-2 border-amber-200 max-w-md mx-auto">
      <div className="text-center mb-6 print:text-lg">
        <h2 className="text-3xl font-bold text-amber-900">☕ CAFE</h2>
        <p className="text-amber-700 text-sm">Your Favorite Coffee Shop</p>
      </div>

      <div className="border-t-2 border-b-2 border-amber-300 py-4 mb-6">
        <p className="text-center text-amber-700 text-sm">
          <span className="block font-semibold text-amber-900">Bill ID: {bill.id}</span>
          <span className="block text-xs">{bill.createdAt.toLocaleString()}</span>
        </p>
      </div>

      {bill.customerName && (
        <div className="mb-4 pb-4 border-b border-amber-200">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Customer:</span> {bill.customerName}
          </p>
        </div>
      )}

      <div className="mb-6 space-y-3">
        {bill.items.map((item) => (
          <div key={item.menuItem.id} className="flex justify-between text-sm text-amber-900">
            <span>
              {item.menuItem.name} <span className="text-amber-600">x{item.quantity}</span>
            </span>
            <span className="font-semibold">{formatCurrency(item.menuItem.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-amber-300 pt-4 space-y-2 mb-6">
        <div className="flex justify-between text-amber-900">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(bill.subtotal)}</span>
        </div>
        <div className="flex justify-between text-amber-900">
          <span>Tax</span>
          <span className="font-semibold">{formatCurrency(bill.tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-amber-900 bg-amber-200 p-3 rounded mt-3">
          <span>TOTAL</span>
          <span>{formatCurrency(bill.total)}</span>
        </div>
      </div>

      <div className="text-center text-xs text-amber-600 mb-6 space-y-1">
        <p>Thank you for your visit!</p>
        <p>Please visit us again</p>
      </div>

      <button
        onClick={handlePrint}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors print:hidden"
      >
        Print Bill
      </button>
    </div>
  );
}
