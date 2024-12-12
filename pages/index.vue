<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="text-gray-600">
        Welcome back, {{ user?.name }} - Your Logistics Management Platform
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="stat in visibleStats" :key="stat.title">
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

    <!-- Composants spécifiques au rôle -->
    <ClientDashboard v-if="isClient" />
    <AdminDashboard v-if="isAdmin" />
    <OperatorDashboard v-if="isOperator" />
    <FinancierDashboard v-if="isFinancier" />
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const user = computed(() => auth.user);

// Vérification des rôles
const isAdmin = computed(() => auth.hasRole(['superadmin', 'admin']));
const isClient = computed(() => auth.hasRole('client'));
const isOperator = computed(() => auth.hasRole('operateur'));
const isFinancier = computed(() => auth.hasRole('financier'));

// Statistiques de base
const baseStats = [
  {
    title: 'Total Packages',
    value: '1,234',
    icon: 'i-lucide-package',
    trend: { value: 12, isPositive: true },
    roles: ['superadmin', 'admin', 'client', 'operateur'],
  },
  {
    title: 'Active Deliveries',
    value: '156',
    icon: 'i-lucide-truck',
    trend: { value: 8, isPositive: true },
    roles: ['superadmin', 'admin', 'operateur'],
  },
  {
    title: 'Total Revenue',
    value: '$45,678',
    icon: 'i-lucide-trending-up',
    trend: { value: 15, isPositive: true },
    roles: ['superadmin', 'admin', 'financier'],
  },
  {
    title: 'Active Users',
    value: '892',
    icon: 'i-lucide-users',
    trend: { value: 3, isPositive: false },
    roles: ['superadmin', 'admin'],
  },
];

// Filtrer les statistiques selon le rôle
const visibleStats = computed(() => {
  return baseStats.filter(stat => {
    return stat.roles.some(role => auth.hasRole(role));
  });
});

definePageMeta({
  middleware: 'auth',
});</script>