<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium">My Packages</h2>
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click="showCreatePackageModal = true"
          >
            New Package
          </UButton>
        </div>
      </template>

      <UTable
        :rows="recentPackages"
        :columns="packageColumns"
      >
        <template #empty-state>
          <div class="text-center py-4 text-gray-500">
            <UIcon name="i-lucide-package" class="w-8 h-8 mx-auto mb-2" />
            <p>No packages found</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Tracking Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Delivery Status</h3>
        </template>
        <div class="space-y-4">
          <div v-for="status in deliveryStatus" :key="status.label" class="flex justify-between items-center">
            <div class="flex items-center space-x-2">
              <UBadge :color="status.color">{{ status.count }}</UBadge>
              <span>{{ status.label }}</span>
            </div>
            <UIcon :name="status.icon" class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Recent Activity</h3>
        </template>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
            <UIcon :name="activity.icon" class="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p class="text-sm font-medium">{{ activity.title }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const showCreatePackageModal = ref(false);

const packageColumns = [
  {
    key: 'trackingNumber',
    label: 'Tracking #',
  },
  {
    key: 'destination',
    label: 'Destination',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'estimatedDelivery',
    label: 'Est. Delivery',
  },
];

const recentPackages = [
  {
    trackingNumber: 'GE-2024-001',
    destination: 'Paris, France',
    status: 'In Transit',
    estimatedDelivery: '2024-03-15',
  },
  // ... autres colis
];

const deliveryStatus = [
  { label: 'In Transit', count: 5, color: 'blue', icon: 'i-lucide-truck' },
  { label: 'Delivered', count: 12, color: 'green', icon: 'i-lucide-check-circle' },
  { label: 'Pending', count: 3, color: 'yellow', icon: 'i-lucide-clock' },
];

const recentActivity = [
  {
    id: 1,
    icon: 'i-lucide-package',
    title: 'Package GE-2024-001 arrived at sorting facility',
    time: '2 hours ago',
  },
  {
    id: 2,
    icon: 'i-lucide-truck',
    title: 'Package GE-2024-002 out for delivery',
    time: '5 hours ago',
  },
];
</script>