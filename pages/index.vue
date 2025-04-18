<script setup lang="ts">
const { user, clear } = useUserSession();
import { ClientOnly } from "#components";
definePageMeta({
  middleware: ["auth"],
});
const handleLogout = async () => {
  await clear();
  window.location.assign("/auth/login");
};
</script>
<template>
  <div>
    <h2>Home page</h2>
    <ul class="flex items-center">
      <li>
        <NuxtLink to="/auth/login"
          ><Button variant="link">Login</Button></NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/auth/register"
          ><Button variant="link">Register</Button></NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/admin"><Button variant="link">Admin</Button></NuxtLink>
      </li>
      <li>
        <Button @click="handleLogout" variant="link">Logout</Button>
      </li>
    </ul>
    <div>{{ user }}</div>
    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </div>
</template>
