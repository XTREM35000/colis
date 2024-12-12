import { getServerSession } from '#auth';
import { z } from 'zod';

const packageSchema = z.object({
  sender: z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
  }),
  recipient: z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
  }),
  weight: z.number(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  insurance: z.object({
    covered: z.boolean(),
    value: z.number().optional(),
  }).optional(),
  notes: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const body = await readBody(event);
  
  try {
    const validatedData = packageSchema.parse(body);
    
    // Simuler la création d'un colis
    return {
      id: Date.now().toString(),
      trackingNumber: `GE-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      status: 'pending',
      ...validatedData,
      price: calculatePrice(validatedData),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Invalid package data',
    });
  }
});