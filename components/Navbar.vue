<template>
    <nav class="bg-gray dark:bg-black-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">System</span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Modetoggle />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 dark:text-gray-400 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            @click="toggleMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
          :class="{ hidden: !isMenuOpen }"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-black-50 dark:bg-black-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray dark:bg-black-800">
            <li>
                <NuxtLink to="/" class="block py-2 px-3 text-black-100 dark:text-white bg-black-700 dark:bg-transparent rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-700" aria-current="page">
                    Home
                </NuxtLink>
            </li>
            <li>
                <nuxt-link to="/signup" class="block py-2 px-3 text-black-100 dark:text-white rounded hover:bg-black-100 dark:hover:bg-black-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500">
                    Sign up
                </nuxt-link>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-black-100 dark:text-white rounded hover:bg-black-100 dark:hover:bg-black-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-black-100 dark:text-white rounded hover:bg-black-100 dark:hover:bg-black-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  