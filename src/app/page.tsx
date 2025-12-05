'use client';

import { useState } from 'react';
import BillingForm from '@/components/BillingForm';
import BillDisplay from '@/components/BillDisplay';
import MenuManager from '@/components/MenuManager';
import { Bill } from '@/types';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('billing');
  const [bill, setBill] = useState<Bill | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-900 mb-2">☕ Cafe Billing System</h1>
          <p className="text-amber-700">Manage your cafe efficiently</p>
        </header>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b border-amber-200">
            <button
              onClick={() => setCurrentTab('billing')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                currentTab === 'billing'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              Create Bill
            </button>
            <button
              onClick={() => setCurrentTab('menu')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                currentTab === 'menu'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              Manage Menu
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {currentTab === 'billing' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BillingForm onBillCreated={setBill} />
                {bill && <BillDisplay bill={bill} />}
              </div>
            )}
            {currentTab === 'menu' && <MenuManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
