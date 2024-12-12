export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  ui: {
    global: true,
    icons: ['heroicons', 'lucide']
  },
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  app: {
    head: {
      title: 'Gogo Export 2.0',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})