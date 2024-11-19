<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="/logo.svg" alt="Gogo Express" class="h-8 w-auto" />
            <span class="ml-2 text-xl font-bold text-gray-800">Gogo Express Business</span>
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">
            <Icon name="heroicons:home" class="w-6 h-6" />
          </NuxtLink>
          <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900">
            <Icon name="heroicons:user" class="w-6 h-6" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>