export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();
  const { openModal } = useModal();

  if (!user.value) {
    openModal('productModal');
    return navigateTo('/');
  }
});
