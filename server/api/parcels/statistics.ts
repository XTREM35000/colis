export default defineEventHandler(() => {
  // In production, replace with actual database queries
  const statistics = {
    totalParcels: parcels.length,
    inTransit: parcels.filter(p => p.status === 'in-transit').length,
    delivered: parcels.filter(p => p.status === 'delivered').length,
    pending: parcels.filter(p => p.status === 'pending').length
  }

  return statistics
})