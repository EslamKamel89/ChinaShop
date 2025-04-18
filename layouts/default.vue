<script setup lang="ts">
const { user, clear } = useUserSession();
const handleLogout = async () => {
  await clear();
  window.location.assign("/auth/login");
};
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <ul class="flex items-center">
      <li>
        <NuxtLink to="/"><Button variant="link">Home</Button></NuxtLink>
      </li>
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
      <li>
        <NuxtLink to="/admin/categories"
          ><Button variant="link">Categories</Button></NuxtLink
        >
      </li>
    </ul>
    <main class="flex-1"><slot /></main>

    <footer class="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div
        class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
      >
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023
          <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>.
          All Rights Reserved.
        </span>
        <ul
          class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
        >
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
