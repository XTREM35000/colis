export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()

  if (status.value === 'unauthenticated' && to.path.startsWith('/admin')) {
    return navigateTo('/login')
  }
})