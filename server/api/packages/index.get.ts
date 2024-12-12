import { getServerSession } from '#auth';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  // Simuler la récupération des colis
  return [
    {
      id: '1',
      trackingNumber: 'GE-2024-001',
      status: 'in_transit',
      sender: {
        name: 'John Doe',
        address: '123 Sender St',
        phone: '+1234567890',
      },
      recipient: {
        name: 'Jane Smith',
        address: '456 Recipient Ave',
        phone: '+0987654321',
      },
      weight: 5.2,
      dimensions: {
        length: 30,
        width: 20,
        height: 15,
      },
      price: 99.99,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
});