import { defineStore } from 'pinia'
import type { Parcel, ParcelStatistics } from '~/types/parcel'

interface ParcelState {
  parcels: Parcel[]
  statistics: ParcelStatistics
  loading: boolean
  error: string | null
}

export const useParcelStore = defineStore('parcel', {
  state: (): ParcelState => ({
    parcels: [],
    statistics: {
      totalParcels: 0,
      inTransit: 0,
      delivered: 0,
      pending: 0
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchParcels() {
      this.loading = true
      try {
        const { data } = await useParcelApi().fetchParcels()
        if (data.value) {
          this.parcels = data.value as Parcel[]
        }
      } catch (error) {
        this.error = 'Failed to fetch parcels'
      } finally {
        this.loading = false
      }
    },

    async fetchStatistics() {
      this.loading = true
      try {
        const { data } = await useParcelApi().fetchStatistics()
        if (data.value) {
          this.statistics = data.value as ParcelStatistics
        }
      } catch (error) {
        this.error = 'Failed to fetch statistics'
      } finally {
        this.loading = false
      }
    },

    async createParcel(parcelData: Partial<Parcel>) {
      this.loading = true
      try {
        const { data } = await useParcelApi().createParcel(parcelData)
        if (data.value) {
          this.parcels.unshift(data.value as Parcel)
          await this.fetchStatistics()
        }
      } catch (error) {
        this.error = 'Failed to create parcel'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateParcel(id: string, parcelData: Partial<Parcel>) {
      this.loading = true
      try {
        const { data } = await useParcelApi().updateParcel(id, parcelData)
        if (data.value) {
          const index = this.parcels.findIndex(p => p.id === id)
          if (index !== -1) {
            this.parcels[index] = data.value as Parcel
          }
          await this.fetchStatistics()
        }
      } catch (error) {
        this.error = 'Failed to update parcel'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})