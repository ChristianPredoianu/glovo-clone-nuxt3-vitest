export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, isAuthReady } = useAuth(to.query.redirect as string);
  // Wait until Firebase authentication is ready
  if (!isAuthReady.value) {
    console.log('Auth not ready yet...');
    return;
  }

  console.log('User:', user.value); // Check user value

  // If user is not authenticated, redirect to home page
  if (!user.value) {
    console.log('Redirecting to home...');
    return navigateTo({
      path: '/',
      query: { redirect: to.fullPath },
    });
  }
});
