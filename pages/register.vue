<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-2xl font-bold text-center">
          Create your Gogo Export Account
        </h2>
      </template>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="First Name" name="firstName">
            <UInput
              v-model="form.firstName"
              placeholder="John"
              :disabled="loading"
              required
            />
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName">
            <UInput
              v-model="form.lastName"
              placeholder="Doe"
              :disabled="loading"
              required
            />
          </UFormGroup>
        </div>

        <UFormGroup label="Email" name="email">
          <UInput
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
            :disabled="loading"
            required
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            :disabled="loading"
            required
          />
        </UFormGroup>

        <UFormGroup label="Company Name" name="companyName">
          <UInput
            v-model="form.companyName"
            placeholder="Your Company"
            :disabled="loading"
            required
          />
        </UFormGroup>

        <UFormGroup label="Account Type" name="role">
          <USelect
            v-model="form.role"
            :options="roleOptions"
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
          Create Account
        </UButton>

        <div class="text-center text-sm text-gray-600">
          Already have an account?
          <NuxtLink to="/login" class="text-primary-600 hover:text-primary-500">
            Sign in
          </NuxtLink>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Role } from '~/types/auth';

const auth = useAuth();
const loading = ref(false);
const toast = useToast();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  companyName: '',
  role: 'client' as Role,
});

const roleOptions = [
  { label: 'Client', value: 'client' },
  { label: 'Operator', value: 'operateur' },
];

async function handleRegister() {
  loading.value = true;
  try {
    await auth.register(form.value);
    toast.add({
      title: 'Success',
      description: 'Account created successfully',
      color: 'green',
    });
    await navigateTo('/login');
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Registration failed',
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
});
</script>