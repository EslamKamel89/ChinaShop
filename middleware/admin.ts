export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  if (!user.value || user.value.role == "USER")
    return navigateTo("/auth/login");
});
