export type ParcelStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled'

export interface Parcel {
  id: string
  trackingNumber: string
  status: ParcelStatus
  origin: string
  destination: string
  sender: {
    name: string
    phone: string
  }
  recipient: {
    name: string
    phone: string
  }
  weight: number
  createdAt: string
  updatedAt: string
}

export interface ParcelStatistics {
  totalParcels: number
  inTransit: number
  delivered: number
  pending: number
}