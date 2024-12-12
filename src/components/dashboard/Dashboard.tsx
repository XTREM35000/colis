import React from 'react';
import { Package, TrendingUp, Users, Truck } from 'lucide-react';
import Navbar from '../layout/Navbar';
import StatCard from './StatCard';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {user?.name} - Your Logistics Management Platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Packages"
            value="1,234"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Deliveries"
            value="156"
            icon={Truck}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value="$45,678"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Active Users"
            value="892"
            icon={Users}
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Loading recent activities...</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;