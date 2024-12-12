<template>
  <div class="space-y-6">
    <!-- Financial Overview -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium">Financial Overview</h2>
          <USelect
            v-model="selectedPeriod"
            :options="periodOptions"
            size="sm"
          />
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="metric in financialMetrics" :key="metric.label" class="p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600">{{ metric.label }}</p>
            <UIcon :name="metric.icon" class="w-5 h-5 text-gray-400" />
          </div>
          <p class="mt-2 text-2xl font-bold">{{ metric.value }}</p>
          <div class="mt-2 flex items-center" :class="metric.trend.isPositive ? 'text-green-600' : 'text-red-600'">
            <UIcon :name="metric.trend.isPositive ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" class="w-4 h-4 mr-1" />
            <span class="text-sm">{{ metric.trend.value }}%</span>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Recent Transactions -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium">Recent Transactions</h3>
      </template>

      <UTable
        :rows="recentTransactions"
        :columns="transactionColumns"
      >
        <template #cell-amount="{ row }">
          <span :class="row.type === 'credit' ? 'text-green-600' : 'text-red-600'">
            {{ row.type === 'credit' ? '+' : '-' }}{{ row.amount }}
          </span>
        </template>
        <template #cell-status="{ row }">
          <UBadge :color="row.status === 'completed' ? 'green' : 'yellow'">
            {{ row.status }}
          </UBadge>
        </template>
      </UTable>
    </UCard>

    <!-- Payment Analytics -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Payment Methods</h3>
        </template>
        <div class="space-y-4">
          <div v-for="method in paymentMethods" :key="method.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <UIcon :name="method.icon" class="w-6 h-6 text-gray-600" />
              <div>
                <p class="font-medium">{{ method.name }}</p>
                <p class="text-sm text-gray-600">{{ method.transactions }} transactions</p>
              </div>
            </div>
            <p class="font-semibold">{{ method.percentage }}%</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Pending Approvals</h3>
        </template>
        <div class="space-y-4">
          <div v-for="approval in pendingApprovals" :key="approval.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium">{{ approval.title }}</p>
              <p class="text-sm text-gray-600">{{ approval.description }}</p>
            </div>
            <div class="flex space-x-2">
              <UButton
                color="red"
                variant="ghost"
                icon="i-lucide-x"
                size="sm"
              />
              <UButton
                color="green"
                variant="ghost"
                icon="i-lucide-check"
                size="sm"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedPeriod = ref('this_month');
const periodOptions = [
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'This Quarter', value: 'this_quarter' },
  { label: 'This Year', value: 'this_year' },
];

const financialMetrics = [
  {
    label: 'Total Revenue',
    value: '$45,678',
    icon: 'i-lucide-dollar-sign',
    trend: { value: 12, isPositive: true },
  },
  {
    label: 'Expenses',
    value: '$12,345',
    icon: 'i-lucide-credit-card',
    trend: { value: 5, isPositive: false },
  },
  {
    label: 'Net Profit',
    value: '$33,333',
    icon: 'i-lucide-trending-up',
    trend: { value: 8, isPositive: true },
  },
];

const transactionColumns = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];

const recentTransactions = [
  {
    id: 'TRX-001',
    date: '2024-03-12',
    description: 'Package Delivery Payment',
    amount: '$299.99',
    type: 'credit',
    status: 'completed',
  },
  {
    id: 'TRX-002',
    date: '2024-03-11',
    description: 'Fuel Expense',
    amount: '$150.00',
    type: 'debit',
    status: 'pending',
  },
];

const paymentMethods = [
  {
    name: 'Credit Card',
    icon: 'i-lucide-credit-card',
    transactions: 156,
    percentage: 45,
  },
  {
    name: 'Mobile Money',
    icon: 'i-lucide-smartphone',
    transactions: 89,
    percentage: 30,
  },
  {
    name: 'Bank Transfer',
    icon: 'i-lucide-building-bank',
    transactions: 67,
    percentage: 25,
  },
];

const pendingApprovals = [
  {
    id: 1,
    title: 'Refund Request',
    description: 'Client #123 - $150.00',
  },
  {
    id: 2,
    title: 'Large Transaction',
    description: 'Amount: $5,000.00',
  },
];
</script>