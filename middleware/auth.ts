export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, isAuthReady } = useAuth(to.query.redirect as string);

  if (!isAuthReady.value) return; // Don't run the middleware until Firebase is ready

  // If the user is not authenticated, redirect them to the login page
  if (!user.value) {
    return navigateTo({
      path: '/',
      query: { redirect: to.fullPath }, // Save the intended route for after login
    });
  }
});
