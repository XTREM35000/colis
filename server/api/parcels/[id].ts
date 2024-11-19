import { H3Event } from 'h3'
import { z } from 'zod'

const updateParcelSchema = z.object({
  status: z.enum(['pending', 'in-transit', 'delivered', 'cancelled']).optional(),
  origin: z.string().min(1).optional(),
  destination: z.string().min(1).optional(),
  sender: z.object({
    name: z.string().min(1),
    phone: z.string().min(1)
  }).optional(),
  recipient: z.object({
    name: z.string().min(1),
    phone: z.string().min(1)
  }).optional(),
  weight: z.number().positive().optional()
})

export default defineEventHandler(async (event: H3Event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Parcel ID is required'
    })
  }

  // In production, replace with database queries
  const parcelIndex = parcels.findIndex(p => p.id === id)
  
  if (parcelIndex === -1) {
    throw createError({
      statusCode: 404,
      message: 'Parcel not found'
    })
  }

  switch (method) {
    case 'GET':
      return parcels[parcelIndex]

    case 'PATCH':
      const body = await readBody(event)
      
      try {
        const validatedData = updateParcelSchema.parse(body)
        
        const updatedParcel = {
          ...parcels[parcelIndex],
          ...validatedData,
          updatedAt: new Date().toISOString()
        }
        
        parcels[parcelIndex] = updatedParcel
        return updatedParcel
      } catch (error) {
        throw createError({
          statusCode: 400,
          message: 'Invalid update data'
        })
      }

    case 'DELETE':
      const deletedParcel = parcels[parcelIndex]
      parcels.splice(parcelIndex, 1)
      return deletedParcel

    default:
      throw createError({
        statusCode: 405,
        message: 'Method not allowed'
      })
  }
})