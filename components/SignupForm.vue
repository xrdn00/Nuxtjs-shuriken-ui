<template>
  <div class="flex items-center justify-center min-h-screen bg-black-100 dark:bg-black-950">
    <div class="w-full max-w-xs mx-auto">
      <div class="bg-white dark:bg-gray-800 shadow-md p-5">
        <h2 class="text-md font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input type="text" id="name" v-model="form.name" class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" placeholder="Username" required />
          </div>
          <div class="mb-2">
            <input type="email" id="email" v-model="form.email" class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" placeholder="Email" required />
          </div>
          <div class="mb-2">
            <input type="password" id="password" v-model="form.password" class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" placeholder="Password" required />
          </div>
          <div class="mb-2">
            <input type="password" id="confirmPassword" v-model="form.confirmPassword" class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" placeholder="Confirm Password" required />
          </div>
          <button type="submit" class="mt-2 mb-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400">Sign Up</button>
        </form>
      </div>
      <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 text-blue-700 dark:text-blue-100">
        <p>Have an account? <nuxt-link to="/"class="text-green-500 hover:underline">Log in</nuxt-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      console.log('Form submitted', this.form);
      // Add your form submission logic here
    }
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
