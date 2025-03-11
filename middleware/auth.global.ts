const protectedRoutes = ['/dashboard', '/profile', '/settings', '/my-account'];

export default defineNuxtRouteMiddleware((to, from) => {
  const { user, isAuthReady } = useAuth(to.query.redirect as string);

  try {
    isAuthReady.value;

    if (protectedRoutes.includes(to.path)) {
      if (!user.value) {
        return navigateTo({
          path: '/',
        });
      }
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return navigateTo({ path: '/' });
  }
});
