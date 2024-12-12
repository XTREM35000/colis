<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-2xl font-bold text-center">
          Sign in to Gogo Export 2.0
        </h2>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            :disabled="loading"
            required
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            :disabled="loading"
            required
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          Sign in
        </UButton>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const loading = ref(false);
const form = ref({
  email: '',
  password: '',
});

async function handleLogin() {
  loading.value = true;
  try {
    await auth.login(form.value);
    await navigateTo('/');
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
});
</script>