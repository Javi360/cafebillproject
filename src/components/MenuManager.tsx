'use client';

import { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { getMenuItems, saveMenuItems } from '@/utils';

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    setMenuItems(getMenuItems());
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert('Please fill in all required fields');
      return;
    }

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      category: newItem.category,
      description: newItem.description,
    };

    const updatedItems = [...menuItems, item];
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
    
    setNewItem({ name: '', price: '', category: '', description: '' });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
  };

  const handleEditPrice = (id: string, newPrice: string) => {
    const updatedItems = menuItems.map((item) =>
      item.id === id ? { ...item, price: parseFloat(newPrice) } : item
    );
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-900 mb-6">Manage Menu Items</h2>

      <form onSubmit={handleAddItem} className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Add New Item</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Item Name *</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g., Espresso"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Price *</label>
            <input
              type="number"
              step="0.01"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Category *</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select a category</option>
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Pastries">Pastries</option>
              <option value="Food">Food</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Description</label>
            <input
              type="text"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="e.g., Single shot"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-8 rounded-lg transition-colors"
        >
          Add Item
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Current Menu Items</h3>
        
        {menuItems.length === 0 ? (
          <p className="text-center text-amber-600">No items in menu</p>
        ) : (
          <div className="grid gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-amber-200 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-900">{item.name}</h4>
                  <p className="text-sm text-amber-600">{item.category}</p>
                  {item.description && (
                    <p className="text-sm text-amber-700 italic">{item.description}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleEditPrice(item.id, e.target.value)}
                    className="w-24 px-2 py-1 border border-amber-300 rounded text-right font-semibold"
                  />
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
