<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" />
    <PackageList />
  </div>
</template>

<script setup lang="ts">
const breadcrumbs = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-home',
    to: '/',
  },
  {
    label: 'Packages',
    icon: 'i-lucide-package',
  },
];

definePageMeta({
  middleware: 'auth',
});
</script>