<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
      <h2 class="text-lg font-medium text-gray-900">Recent Parcels</h2>
      <button
        @click="showNewParcelModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Icon name="heroicons:plus" class="h-5 w-5 mr-2" />
        New Parcel
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tracking Number
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Origin
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destination
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="parcel in parcels" :key="parcel.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ parcel.trackingNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <ParcelStatus :status="parcel.status" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ parcel.origin }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ parcel.destination }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                @click="editParcel(parcel)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="updateStatus(parcel)"
                class="text-green-600 hover:text-green-900"
              >
                Update Status
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- New Parcel Modal -->
    <Modal
      :is-open="showNewParcelModal"
      title="Create New Parcel"
      @close="showNewParcelModal = false"
    >
      <ParcelForm
        @submit="handleCreateParcel"
        @cancel="showNewParcelModal = false"
      />
    </Modal>

    <!-- Edit Parcel Modal -->
    <Modal
      :is-open="!!selectedParcel"
      title="Edit Parcel"
      @close="selectedParcel = null"
    >
      <ParcelForm
        v-if="selectedParcel"
        :parcel="selectedParcel"
        @submit="handleUpdateParcel"
        @cancel="selectedParcel = null"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Parcel } from '~/types/parcel'
import { useParcelStore } from '~/stores/parcel'

const props = defineProps<{
  parcels: Parcel[]
}>()

const parcelStore = useParcelStore()
const showNewParcelModal = ref(false)
const selectedParcel = ref<Parcel | null>(null)

const editParcel = (parcel: Parcel) => {
  selectedParcel.value = parcel
}

const updateStatus = (parcel: Parcel) => {
  // Will be implemented in the next update
}

const handleCreateParcel = async (data: Partial<Parcel>) => {
  await parcelStore.createParcel(data)
  showNewParcelModal.value = false
}

const handleUpdateParcel = async (data: Partial<Parcel>) => {
  if (selectedParcel.value) {
    await parcelStore.updateParcel(selectedParcel.value.id, data)
    selectedParcel.value = null
  }
}
</script>