import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  // Simulate fetching brand info from database
  return {
    companyName: 'Gogo Export',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&h=300&fit=crop',
    contactPerson: {
      name: 'John Doe',
      email: 'john.doe@gogoexport.com',
      phone: '+1234567890',
      role: 'superadmin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});