import { H3Event } from 'h3'
import { z } from 'zod'

const parcelSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  sender: z.object({
    name: z.string().min(1),
    phone: z.string().min(1)
  }),
  recipient: z.object({
    name: z.string().min(1),
    phone: z.string().min(1)
  }),
  weight: z.number().positive()
})

// Mock database (replace with real database in production)
let parcels: any[] = []

export default defineEventHandler(async (event: H3Event) => {
  const method = event.method

  switch (method) {
    case 'GET':
      return parcels

    case 'POST':
      const body = await readBody(event)
      
      try {
        const validatedData = parcelSchema.parse(body)
        
        const newParcel = {
          id: Math.random().toString(36).substr(2, 9),
          trackingNumber: `TRK${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          status: 'pending',
          ...validatedData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        parcels.unshift(newParcel)
        return newParcel
      } catch (error) {
        throw createError({
          statusCode: 400,
          message: 'Invalid parcel data'
        })
      }

    default:
      throw createError({
        statusCode: 405,
        message: 'Method not allowed'
      })
  }
})