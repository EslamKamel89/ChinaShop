<script setup lang="ts">
const { user, clear } = useUserSession();
definePageMeta({
  middleware: ["auth"],
});
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
        <Button @click="clear" variant="link">Logout</Button>
      </li>
    </ul>
    <div>{{ user }}</div>
  </div>
</template>
