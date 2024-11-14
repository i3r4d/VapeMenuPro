import React from 'react';
import { DollarSign, Users, Store, BarChart3 } from 'lucide-react';
import { Shop, User } from '../types';

interface AdminDashboardProps {
  shops: Shop[];
  users: User[];
}

export default function AdminDashboard({ shops, users }: AdminDashboardProps) {
  const activeSubscriptions = shops.filter(shop => shop.subscriptionStatus === 'active').length;
  const totalRevenue = users.reduce((acc, user) => acc + (user.subscriptionTier === 'premium' ? 49.99 : 29.99), 0);
  
  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign },
    { label: 'Active Shops', value: activeSubscriptions, icon: Store },
    { label: 'Total Users', value: users.length, icon: Users },
    { label: 'Conversion Rate', value: `${((activeSubscriptions / shops.length) * 100).toFixed(1)}%`, icon: BarChart3 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Subscriptions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Shop Name</th>
                <th className="text-left py-3 px-4">Owner</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Subscription</th>
              </tr>
            </thead>
            <tbody>
              {shops.slice(0, 5).map((shop) => (
                <tr key={shop.id} className="border-b">
                  <td className="py-3 px-4">{shop.name}</td>
                  <td className="py-3 px-4">{users.find(u => u.id === shop.ownerId)?.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                      shop.subscriptionStatus === 'trial' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {shop.subscriptionStatus.charAt(0).toUpperCase() + shop.subscriptionStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {users.find(u => u.id === shop.ownerId)?.subscriptionTier === 'premium' ? 'Premium' : 'Basic'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}