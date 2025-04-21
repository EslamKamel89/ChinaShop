<script setup lang="ts"></script>
<template>
  <div>
    <NuxtLoadingIndicator :height="5"></NuxtLoadingIndicator>
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>
