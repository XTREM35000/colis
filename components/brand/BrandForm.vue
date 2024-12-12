<template>
  <UForm :state="form" class="space-y-6" @submit="handleSubmit">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Company Information</h3>
          <UButton
            v-if="!isEditing"
            color="gray"
            variant="ghost"
            icon="i-lucide-edit"
            @click="isEditing = true"
          >
            Edit
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <!-- Company Logo -->
        <div class="flex items-center space-x-4">
          <UAvatar
            :src="form.companyLogo"
            :alt="form.companyName"
            size="2xl"
          />
          <div v-if="isEditing">
            <UFormGroup label="Logo URL">
              <UInput v-model="form.companyLogo" />
            </UFormGroup>
          </div>
        </div>

        <!-- Company Name -->
        <UFormGroup label="Company Name">
          <UInput
            v-model="form.companyName"
            :readonly="!isEditing"
          />
        </UFormGroup>

        <!-- Contact Person -->
        <div class="space-y-4">
          <h4 class="font-medium">Contact Person</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Name">
              <UInput
                v-model="form.contactPerson.name"
                :readonly="!isEditing"
              />
            </UFormGroup>

            <UFormGroup label="Email">
              <UInput
                v-model="form.contactPerson.email"
                type="email"
                :readonly="!isEditing"
              />
            </UFormGroup>

            <UFormGroup label="Phone">
              <UInput
                v-model="form.contactPerson.phone"
                :readonly="!isEditing"
              />
            </UFormGroup>

            <UFormGroup label="Avatar URL">
              <UInput
                v-model="form.contactPerson.avatar"
                :readonly="!isEditing"
              />
            </UFormGroup>
          </div>
        </div>
      </div>

      <template #footer>
        <div v-if="isEditing" class="flex justify-end space-x-2">
          <UButton
            color="gray"
            variant="ghost"
            @click="cancelEdit"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
          >
            Save Changes
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script setup lang="ts">
import type { BrandInfo } from '~/types/brand';

const { brandInfo, loading, updateBrandInfo } = useBrand();
const isEditing = ref(false);

const form = reactive({
  companyName: '',
  companyLogo: '',
  contactPerson: {
    name: '',
    email: '',
    phone: '',
    role: 'superadmin',
    avatar: ''
  }
});

watch(brandInfo, (newInfo) => {
  if (newInfo) {
    Object.assign(form, newInfo);
  }
}, { immediate: true });

const cancelEdit = () => {
  isEditing.value = false;
  if (brandInfo.value) {
    Object.assign(form, brandInfo.value);
  }
};

const handleSubmit = async () => {
  try {
    await updateBrandInfo(form);
    isEditing.value = false;
    useToast().add({
      title: 'Success',
      description: 'Brand information updated successfully',
      color: 'green'
    });
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: 'Failed to update brand information',
      color: 'red'
    });
  }
};
</script>