<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Sender Information -->
      <div class="space-y-4">
        <h4 class="font-medium">Sender Information</h4>
        <UFormGroup label="Name">
          <UInput v-model="form.sender.name" required />
        </UFormGroup>
        <UFormGroup label="Address">
          <UTextarea v-model="form.sender.address" required />
        </UFormGroup>
        <UFormGroup label="Phone">
          <UInput v-model="form.sender.phone" required />
        </UFormGroup>
      </div>

      <!-- Recipient Information -->
      <div class="space-y-4">
        <h4 class="font-medium">Recipient Information</h4>
        <UFormGroup label="Name">
          <UInput v-model="form.recipient.name" required />
        </UFormGroup>
        <UFormGroup label="Address">
          <UTextarea v-model="form.recipient.address" required />
        </UFormGroup>
        <UFormGroup label="Phone">
          <UInput v-model="form.recipient.phone" required />
        </UFormGroup>
      </div>
    </div>

    <!-- Package Details -->
    <div class="space-y-4">
      <h4 class="font-medium">Package Details</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormGroup label="Weight (kg)">
          <UInput
            v-model="form.weight"
            type="number"
            step="0.1"
            required
          />
        </UFormGroup>
        <UFormGroup label="Length (cm)">
          <UInput
            v-model="form.dimensions.length"
            type="number"
            required
          />
        </UFormGroup>
        <UFormGroup label="Width (cm)">
          <UInput
            v-model="form.dimensions.width"
            type="number"
            required
          />
        </UFormGroup>
      </div>
    </div>

    <!-- Insurance -->
    <UFormGroup>
      <template #label>
        <div class="flex items-center justify-between">
          <span>Insurance</span>
          <USwitch v-model="form.insurance.covered" />
        </div>
      </template>
      <UInput
        v-if="form.insurance.covered"
        v-model="form.insurance.value"
        type="number"
        placeholder="Insurance Value"
        required
      />
    </UFormGroup>

    <!-- Notes -->
    <UFormGroup label="Notes">
      <UTextarea v-model="form.notes" />
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="gray" @click="$emit('cancel')">
        Cancel
      </UButton>
      <UButton type="submit" color="primary">
        Create Package
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['submit', 'cancel']);

const form = ref({
  sender: {
    name: '',
    address: '',
    phone: '',
  },
  recipient: {
    name: '',
    address: '',
    phone: '',
  },
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  insurance: {
    covered: false,
    value: 0,
  },
  notes: '',
});

const handleSubmit = () => {
  emit('submit', { ...form.value });
};
</script>