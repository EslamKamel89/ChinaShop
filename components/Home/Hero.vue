<script setup lang="ts"></script>
<template>
  <div
    class="min-h-screen !w-full mask mask-heart flex flex-col"
    style="background-image: url(/assets/ecommerce.png)"
  >
    <div class="text-center flex flex-col flex-1 w-full">
      <div class="flex-1 flex flex-col justify-center space-y-5 md:space-y-10">
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mx-9 mt-9"
        >
          Bringing China to Cairo!
        </h1>
        <p
          class="text-black bg-white/50 text-xs md:text-sm w-[200px] sm:w-[250] md:w-[350px] mx-auto p-2 rounded-lg"
        >
          Discover handpicked quality: from tech gadgets to traditional crafts,
          all at unbeatable prices
        </p>
        <NuxtLink to="/products" class="btn btn-primary">Get Started</NuxtLink>
      </div>
    </div>
  </div>
</template>
