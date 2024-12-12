<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Packages</h2>
      <UButton
        v-if="canCreatePackage"
        icon="i-lucide-plus"
        @click="showCreateModal = true"
      >
        New Package
      </UButton>
    </div>

    <UCard>
      <UTable
        :rows="packages"
        :columns="columns"
        :loading="loading"
      >
        <template #loading-state>
          <div class="flex items-center justify-center p-4">
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            <span class="ml-2">Loading packages...</span>
          </div>
        </template>

        <template #empty-state>
          <div class="flex flex-col items-center justify-center p-4 text-gray-500">
            <UIcon name="i-lucide-package" class="w-8 h-8 mb-2" />
            <p>No packages found</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <UModal v-model="showCreateModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Create New Package</h3>
        </template>
        <PackageForm @submit="handleCreatePackage" @cancel="showCreateModal = false" />
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const { packages, loading, fetchPackages, createPackage } = usePackages();
const auth = useAuth();
const showCreateModal = ref(false);

const canCreatePackage = computed(() => {
  return auth.hasRole(['admin', 'client', 'operateur']);
});

const columns = [
  {
    key: 'trackingNumber',
    label: 'Tracking Number',
  },
  {
    key: 'status',
    label: 'Status',
    render: (status: string) => {
      const statusColors = {
        pending: 'yellow',
        in_transit: 'blue',
        delivered: 'green',
        cancelled: 'red',
      };
      return h(UBadge, { color: statusColors[status] }, () => status);
    },
  },
  {
    key: 'sender.name',
    label: 'Sender',
  },
  {
    key: 'recipient.name',
    label: 'Recipient',
  },
  {
    key: 'createdAt',
    label: 'Created At',
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

const handleCreatePackage = async (data) => {
  try {
    await createPackage(data);
    showCreateModal.value = false;
    await fetchPackages();
  } catch (error) {
    console.error('Failed to create package:', error);
  }
};

onMounted(() => {
  fetchPackages();
});
</script>