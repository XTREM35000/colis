import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    const credentials = loginSchema.parse(body);
    
    // Simulation d'authentification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: '1',
      email: credentials.email,
      name: 'John Doe',
      role: 'admin',
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Invalid credentials',
    });
  }
});