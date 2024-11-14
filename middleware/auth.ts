export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, isAuthReady } = useAuth(to.query.redirect as string);

  if (!isAuthReady.value) return; // Don't run the middleware until Firebase is ready

  if (!user.value) {
    return navigateTo({
      path: '/',
      query: { redirect: to.fullPath },
    });
  }
});
