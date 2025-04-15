<script setup lang="ts">
const { user } = useUserSession();
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
    </ul>
    <div>{{ user }}</div>
  </div>
</template>
