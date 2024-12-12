import { ref } from 'vue';
import type { Package } from '~/types/package';

export const usePackages = () => {
  const packages = ref<Package[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPackages = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await useFetch('/api/packages');
      packages.value = response.data.value as Package[];
    } catch (err) {
      error.value = 'Failed to fetch packages';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createPackage = async (packageData: Partial<Package>) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await useFetch('/api/packages', {
        method: 'POST',
        body: packageData,
      });
      return response.data.value;
    } catch (err) {
      error.value = 'Failed to create package';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    packages,
    loading,
    error,
    fetchPackages,
    createPackage,
  };
};