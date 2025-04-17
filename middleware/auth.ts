export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  pr(user.value, "user in useUserSession");
  // if (!user.value) return navigateTo("/auth/login");
  // const { status} = useAuth();
});
