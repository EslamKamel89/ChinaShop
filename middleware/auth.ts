export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  if (!user.value) return navigateTo("/auth/login");
});
