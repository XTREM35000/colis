<template>
  <span
    :class="[
      statusClasses[status],
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
    ]"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { ParcelStatus } from '~/types/parcel'

const props = defineProps<{
  status: ParcelStatus
}>()

const statusClasses = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'in-transit': 'bg-blue-100 text-blue-800',
  'delivered': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800'
}
</script>