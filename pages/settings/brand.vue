<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" />
    
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Brand Settings</h1>
      <p class="text-gray-500">Manage your company information and branding</p>
    </div>

    <BrandForm />
  </div>
</template>

<script setup lang="ts">
const { fetchBrandInfo } = useBrand();

const breadcrumbs = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings'
  },
  {
    label: 'Brand',
    icon: 'i-lucide-briefcase'
  }
];

onMounted(() => {
  fetchBrandInfo();
});

definePageMeta({
  middleware: 'auth'
});
</script>