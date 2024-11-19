<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Track Your Parcel</h1>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <form @submit.prevent="trackParcel" class="space-y-4">
        <div>
          <label for="tracking" class="block text-sm font-medium text-gray-700">Tracking Number</label>
          <input
            id="tracking"
            v-model="trackingNumber"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your tracking number"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Track Parcel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const trackingNumber = ref('')

const trackParcel = () => {
  // Implement tracking logic
  console.log('Tracking parcel:', trackingNumber.value)
}
</script>