export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const { user, isAuthReady } = useAuth(to.query.redirect as string);

    await isAuthReady.value;

    console.log('User:', user.value);

    if (!user.value) {
      return navigateTo({
        path: '/',
        query: { redirect: to.fullPath },
      });
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return navigateTo({ path: '/', query: { redirect: to.fullPath } });
  }
});
