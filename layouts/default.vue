<template>
  <div class="min-h-screen bg-gray-50">
    <UHeader
      :links="headerLinks"
      :user="user"
      @logout="handleLogout"
    />
    <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const user = computed(() => auth.user);

const headerLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Packages', to: '/packages' },
  { label: 'Users', to: '/users', show: () => auth.isAdmin() },
];

function handleLogout() {
  auth.logout();
}
</script>