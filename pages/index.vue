<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="text-gray-600">
        Welcome back, {{ user?.name }} - Your Logistics Management Platform
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="stat in stats" :key="stat.title">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ stat.title }}</p>
            <p class="mt-2 text-3xl font-semibold">{{ stat.value }}</p>
          </div>
          <UIcon
            :name="stat.icon"
            class="w-12 h-12 text-primary"
          />
        </div>
        <div v-if="stat.trend" class="mt-4">
          <span :class="stat.trend.isPositive ? 'text-green-600' : 'text-red-600'">
            {{ stat.trend.isPositive ? '+' : '-' }}{{ Math.abs(stat.trend.value) }}%
          </span>
          <span class="text-gray-500 ml-2">vs last month</span>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-lg font-medium">Recent Activity</h2>
      </template>
      <p class="text-gray-600">Loading recent activities...</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const user = computed(() => auth.user);

const stats = [
  {
    title: 'Total Packages',
    value: '1,234',
    icon: 'i-lucide-package',
    trend: { value: 12, isPositive: true },
  },
  {
    title: 'Active Deliveries',
    value: '156',
    icon: 'i-lucide-truck',
    trend: { value: 8, isPositive: true },
  },
  {
    title: 'Total Revenue',
    value: '$45,678',
    icon: 'i-lucide-trending-up',
    trend: { value: 15, isPositive: true },
  },
  {
    title: 'Active Users',
    value: '892',
    icon: 'i-lucide-users',
    trend: { value: 3, isPositive: false },
  },
];

definePageMeta({
  middleware: 'auth',
});
</script>