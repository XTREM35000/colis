<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <!-- Origin & Destination -->
      <div>
        <label for="origin" class="block text-sm font-medium text-gray-700">Origin</label>
        <input
          id="origin"
          v-model="form.origin"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label for="destination" class="block text-sm font-medium text-gray-700">Destination</label>
        <input
          id="destination"
          v-model="form.destination"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <!-- Sender Information -->
      <div>
        <label for="senderName" class="block text-sm font-medium text-gray-700">Sender Name</label>
        <input
          id="senderName"
          v-model="form.sender.name"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label for="senderPhone" class="block text-sm font-medium text-gray-700">Sender Phone</label>
        <vue-phone-number-input
          v-model="form.sender.phone"
          default-country-code="FR"
          :required="true"
          class="mt-1"
        />
      </div>

      <!-- Recipient Information -->
      <div>
        <label for="recipientName" class="block text-sm font-medium text-gray-700">Recipient Name</label>
        <input
          id="recipientName"
          v-model="form.recipient.name"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label for="recipientPhone" class="block text-sm font-medium text-gray-700">Recipient Phone</label>
        <vue-phone-number-input
          v-model="form.recipient.phone"
          default-country-code="FR"
          :required="true"
          class="mt-1"
        />
      </div>

      <!-- Weight -->
      <div>
        <label for="weight" class="block text-sm font-medium text-gray-700">Weight (kg)</label>
        <input
          id="weight"
          v-model.number="form.weight"
          type="number"
          step="0.1"
          min="0"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <!-- Status (only for editing) -->
      <div v-if="isEditing">
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          v-model="form.status"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="pending">Pending</option>
          <option value="in-transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {{ isEditing ? 'Update' : 'Create' }} Parcel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Parcel, ParcelStatus } from '~/types/parcel'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

const props = defineProps<{
  parcel?: Parcel
}>()

const emit = defineEmits<{
  (e: 'submit', data: Partial<Parcel>): void
  (e: 'cancel'): void
}>()

const isEditing = computed(() => !!props.parcel)

const form = reactive({
  origin: props.parcel?.origin ?? '',
  destination: props.parcel?.destination ?? '',
  sender: {
    name: props.parcel?.sender.name ?? '',
    phone: props.parcel?.sender.phone ?? ''
  },
  recipient: {
    name: props.parcel?.recipient.name ?? '',
    phone: props.parcel?.recipient.phone ?? ''
  },
  weight: props.parcel?.weight ?? 0,
  status: props.parcel?.status ?? 'pending' as ParcelStatus
})

const handleSubmit = () => {
  emit('submit', form)
}
</script>