import { defineEventHandler, readBody } from 'h3';
import type { UpdateBrandInfo } from '~/types/brand';

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as UpdateBrandInfo;
  
  // Simulate updating brand info in database
  return {
    ...body,
    updatedAt: new Date().toISOString()
  };
});