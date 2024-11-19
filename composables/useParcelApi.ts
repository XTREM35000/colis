export const useParcelApi = () => {
  const config = useRuntimeConfig()

  const fetchParcels = () => useFetch('/api/parcels')
  
  const fetchParcel = (id: string) => useFetch(`/api/parcels/${id}`)
  
  const createParcel = (data: any) => useFetch('/api/parcels', {
    method: 'POST',
    body: data
  })
  
  const updateParcel = (id: string, data: any) => useFetch(`/api/parcels/${id}`, {
    method: 'PATCH',
    body: data
  })
  
  const deleteParcel = (id: string) => useFetch(`/api/parcels/${id}`, {
    method: 'DELETE'
  })
  
  const trackParcel = (trackingNumber: string) => useFetch(`/api/parcels/track/${trackingNumber}`)
  
  const fetchStatistics = () => useFetch('/api/parcels/statistics')

  return {
    fetchParcels,
    fetchParcel,
    createParcel,
    updateParcel,
    deleteParcel,
    trackParcel,
    fetchStatistics
  }
}