import { z } from 'zod';
import type { Role } from '~/types/auth';

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  companyName: z.string().min(2),
  role: z.enum(['client', 'operateur']),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    const userData = registerSchema.parse(body);
    
    // TODO: Vérifier si l'email existe déjà
    // TODO: Hasher le mot de passe
    // TODO: Créer l'utilisateur dans MongoDB
    
    // Simulation d'enregistrement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Invalid registration data',
    });
  }
});