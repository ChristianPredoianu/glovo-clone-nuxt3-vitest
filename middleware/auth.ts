const protectedRoutes = ['/dashboard', '/profile', '/settings'];

export default defineNuxtRouteMiddleware(async (to, from) => {
  /*  const { user, isAuthReady } = useAuth(to.query.redirect as string);
  console.log(to.query.redirect as string);
  try {
    console.log(to.query.redirect as string);

    console.log('isAuthReady:', isAuthReady.value);
    await isAuthReady.value;
    console.log('User after isAuthReady:', user.value);

    // Check if the route is in the protected list
    if (protectedRoutes.includes(to.path)) {
      if (!user.value) {
        console.log('User is not signed in, redirecting...');
        return navigateTo({
          path: '/',
          query: { redirect: to.fullPath }, // Redirect to login page if not authenticated
        });
      }
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return navigateTo({ path: '/', query: { redirect: to.fullPath } });
  } */
});
