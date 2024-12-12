import type { BrandInfo, UpdateBrandInfo } from '~/types/brand';

export const useBrand = () => {
  const brandInfo = ref<BrandInfo | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchBrandInfo = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch('/api/brand');
      brandInfo.value = data.value as BrandInfo;
    } catch (err) {
      error.value = 'Failed to fetch brand information';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateBrandInfo = async (info: UpdateBrandInfo) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch('/api/brand', {
        method: 'POST',
        body: info
      });
      brandInfo.value = data.value as BrandInfo;
      return data.value;
    } catch (err) {
      error.value = 'Failed to update brand information';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    brandInfo,
    loading,
    error,
    fetchBrandInfo,
    updateBrandInfo
  };
};