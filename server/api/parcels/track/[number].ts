export default defineEventHandler((event) => {
  const trackingNumber = event.context.params?.number

  if (!trackingNumber) {
    throw createError({
      statusCode: 400,
      message: 'Tracking number is required'
    })
  }

  // In production, replace with database query
  const parcel = parcels.find(p => p.trackingNumber === trackingNumber)

  if (!parcel) {
    throw createError({
      statusCode: 404,
      message: 'Parcel not found'
    })
  }

  return parcel
})