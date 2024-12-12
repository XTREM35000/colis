<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <h2 class="text-lg font-medium">System Overview</h2>
      </template>
      
      <div class="space-y-4">
        <!-- Performance Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="metric in performanceMetrics" :key="metric.label">
            <p class="text-sm text-gray-600">{{ metric.label }}</p>
            <p class="text-2xl font-semibold">{{ metric.value }}</p>
          </div>
        </div>

        <!-- Recent Activities -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Recent Activities</h3>
          <div class="space-y-2">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <UIcon :name="activity.icon" class="flex-shrink-0 w-5 h-5 text-gray-400" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-500">{{ activity.description }}</p>
              </div>
              <div class="text-xs text-gray-500">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard v-for="action in quickActions" :key="action.label" class="hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-3">
          <UIcon :name="action.icon" class="w-8 h-8 text-primary" />
          <div>
            <h3 class="font-medium">{{ action.label }}</h3>
            <p class="text-sm text-gray-600">{{ action.description }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const performanceMetrics = [
  { label: 'System Uptime', value: '99.9%' },
  { label: 'Active Sessions', value: '234' },
  { label: 'API Response Time', value: '45ms' },
];

const recentActivities = [
  {
    id: 1,
    icon: 'i-lucide-user-plus',
    title: 'New User Registration',
    description: 'John Doe registered as a client',
    time: '5m ago',
  },
  {
    id: 2,
    icon: 'i-lucide-package',
    title: 'Package Status Updated',
    description: 'Package #12345 marked as delivered',
    time: '15m ago',
  },
  {
    id: 3,
    icon: 'i-lucide-credit-card',
    title: 'Payment Processed',
    description: 'Payment of $299 received from Client XYZ',
    time: '1h ago',
  },
];

const quickActions = [
  {
    label: 'Manage Users',
    description: 'Add, edit, or remove system users',
    icon: 'i-lucide-users',
  },
  {
    label: 'System Settings',
    description: 'Configure system parameters',
    icon: 'i-lucide-settings',
  },
  {
    label: 'View Reports',
    description: 'Access detailed system reports',
    icon: 'i-lucide-file-text',
  },
];
</script>