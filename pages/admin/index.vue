<template>
  <div class="space-y-6">
    <header class="bg-white shadow">
      <div class="px-4 py-6 mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-4">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Parcels"
          :value="statistics.totalParcels"
          icon="heroicons:package"
          color="bg-blue-500"
        />
        <DashboardCard
          title="In Transit"
          :value="statistics.inTransit"
          icon="heroicons:truck"
          color="bg-yellow-500"
        />
        <DashboardCard
          title="Delivered"
          :value="statistics.delivered"
          icon="heroicons:check-circle"
          color="bg-green-500"
        />
        <DashboardCard
          title="Pending"
          :value="statistics.pending"
          icon="heroicons:clock"
          color="bg-purple-500"
        />
      </div>

      <div class="mt-8">
        <ParcelList :parcels="parcels" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useParcelStore } from '~/stores/parcel'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: 'auth'
})

const parcelStore = useParcelStore()
const { statistics, parcels } = storeToRefs(parcelStore)

// Load initial data
onMounted(() => {
  parcelStore.fetchParcels()
  parcelStore.fetchStatistics()
})
</script>