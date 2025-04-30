<script setup lang="ts">
import { ShoppingCart } from "lucide-vue-next";

const { user, clear } = useUserSession();
const handleLogout = async () => {
  await clear();
  window.location.assign("/auth/login");
};
const showMobileMenu = ref(false);
const breakpoints = useBreakpoints({
  mobile: 640,
  tablet: 768,
  desktop: 1024,
});
const isMobile = breakpoints.smaller("tablet");
watch(isMobile, (current, prev) => {
  showMobileMenu.value = false;
});
const session = useUserSession();
const { state: cartItems } = useCart();
onMounted(() => {});
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <nav
      class="bg-gray-50 border border-b-1 shadow-xl rounded-b-3xl border-gray-200 dark:bg-gray-900 dark:border-gray-700"
    >
      <div
        class="max-w-5xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            :src="`${baseUrl()}/assets/china-shop-2.png`"
            class="h-24"
            alt="Flowbite Logo"
          />
        </NuxtLink>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          v-if="showMobileMenu || !isMobile"
          class="w-full md:block md:w-auto"
          id="navbar-dropdown"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-700 md:bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <LayoutNavItem
              to="/"
              title="Home"
              @hide-menu="showMobileMenu = false"
            />
            <LayoutNavItem
              to="/cart"
              title="Cart"
              @hide-menu="showMobileMenu = false"
            >
              <template #icon>
                <div class="relative">
                  <ShoppingCart class="ml-2 w-4" />
                  <div
                    class="absolute -top-4 -right-5 rounded-full px-2 py-1 bg-primary/5 text-black text-xs"
                  >
                    {{ cartItems.items.length }}
                  </div>
                </div>
              </template>
            </LayoutNavItem>
            <LayoutNavDropdown
              v-if="session.user.value"
              :links="[
                {
                  to: '/admin',
                  title: 'Dashboard',
                },
                {
                  to: '/admin/categories',
                  title: 'Categories',
                },
                {
                  to: '/admin/colors',
                  title: 'Colors',
                },
                {
                  to: '/admin/sizes',
                  title: 'Sizes',
                },
                {
                  to: '/admin/products',
                  title: 'Products',
                },
              ]"
              title="Admin"
            />

            <LayoutNavAuthDropdown
              :links="
                !session.user.value
                  ? [
                      {
                        to: '/auth/register',
                        title: 'Register',
                      },
                      {
                        to: '/auth/login',
                        title: 'Login',
                      },
                    ]
                  : []
              "
            >
              <LayoutNavItem
                v-if="session.user.value"
                type="button"
                :click="handleLogout"
                title="Logout"
                @hide-menu="showMobileMenu = false"
              />
            </LayoutNavAuthDropdown>
          </ul>
        </div>
      </div>
    </nav>
    <div class="flex flex-col max-w-5xl mx-auto flex-1">
      <main class="flex-1 m-4"><slot /></main>

      <footer class="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
        <div
          class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
        >
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
            >© 2023
            <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a
            >. All Rights Reserved.
          </span>
          <ul
            class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
          >
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6"
                >Privacy Policy</a
              >
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
  </div>
</template>
