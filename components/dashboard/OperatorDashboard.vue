<template>
  <div class="space-y-6">
    <!-- Tasks Overview -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium">Today's Tasks</h2>
          <UBadge color="primary">{{ pendingTasks.length }} Pending</UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <div v-for="task in pendingTasks" :key="task.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center space-x-3">
            <UIcon :name="task.icon" class="w-5 h-5 text-gray-400" />
            <div>
              <p class="font-medium">{{ task.title }}</p>
              <p class="text-sm text-gray-600">{{ task.description }}</p>
            </div>
          </div>
          <UButton
            size="sm"
            :color="task.priority === 'high' ? 'red' : 'primary'"
            @click="completeTask(task.id)"
          >
            Complete
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Delivery Map & Routes -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Active Deliveries</h3>
        </template>
        <div class="space-y-4">
          <div v-for="delivery in activeDeliveries" :key="delivery.id" class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <UAvatar
              :src="delivery.customerAvatar"
              :alt="delivery.customerName"
            />
            <div class="flex-1">
              <p class="font-medium">{{ delivery.customerName }}</p>
              <p class="text-sm text-gray-600">{{ delivery.address }}</p>
            </div>
            <UBadge :color="delivery.status === 'on_route' ? 'green' : 'yellow'">
              {{ delivery.status === 'on_route' ? 'On Route' : 'Pending' }}
            </UBadge>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Performance Metrics</h3>
        </template>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="metric in performanceMetrics" :key="metric.label" class="text-center p-4 bg-gray-50 rounded-lg">
            <p class="text-2xl font-bold">{{ metric.value }}</p>
            <p class="text-sm text-gray-600">{{ metric.label }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const pendingTasks = [
  {
    id: 1,
    title: 'Package Pickup',
    description: 'Collect package from warehouse A3',
    priority: 'high',
    icon: 'i-lucide-package',
  },
  {
    id: 2,
    title: 'Delivery Route Planning',
    description: 'Optimize route for 5 deliveries',
    priority: 'medium',
    icon: 'i-lucide-map',
  },
];

const activeDeliveries = [
  {
    id: 1,
    customerName: 'John Doe',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop',
    address: '123 Main St, Paris',
    status: 'on_route',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&fit=crop',
    address: '456 Oak Ave, Lyon',
    status: 'pending',
  },
];

const performanceMetrics = [
  { label: 'Deliveries Today', value: '24' },
  { label: 'On-Time Rate', value: '96%' },
  { label: 'Customer Rating', value: '4.8' },
  { label: 'Active Hours', value: '7.5' },
];

function completeTask(taskId: number) {
  // Implémenter la logique de complétion des tâches
  console.log('Task completed:', taskId);
}
</script>