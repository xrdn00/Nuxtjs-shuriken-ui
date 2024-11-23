<template>
  <div class="flex items-center justify-center min-h-screen bg-black-100 dark:bg-black-950">
    <div class="w-full max-w-xs mx-auto">
      <div class="bg-white dark:bg-gray-800 shadow-md p-5">
        <h2 class="text-md font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" 
              placeholder="Username" 
              required 
            />
          </div>
          <div class="mb-2">
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" 
              placeholder="Email" 
              required 
            />
          </div>
          <div class="mb-2">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Password"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-2 text-gray-500 dark:text-gray-300"
              @click="togglePasswordVisibility('password')"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <div class="mb-2">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              class="p-2 mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-2 text-gray-500 dark:text-gray-300"
              @click="togglePasswordVisibility('confirmPassword')"
            >
              {{ showConfirmPassword ? 'Hide' : 'Show' }}
            </button>
            <p v-if="!passwordsMatch && confirmPassword" class="mt-1 text-sm text-red-600">
              Passwords do not match
            </p>
            <div v-if="message" class="mt-4 p-4" :class="success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
              {{ message }}
            </div>
          </div>
          <button 
            type="submit" 
            :disabled="!isFormValid"
            class="mt-2 mb-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 text-blue-700 dark:text-blue-100">
        <p>Have an account? <nuxt-link to="/" class="text-green-500 hover:underline">Log in</nuxt-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';

interface FormData {
  username: string;
  email: string;
  password: string;
}
const formData = ref<FormData>({
  username: '',
  email: '',
  password: ''
});

const message = ref<string>('');
const success = ref<boolean>(false);

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = (field: string) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  } else if (field === "confirmPassword") {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};

const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value;
});

const isFormValid = computed(() => {
  return username.value && email.value && password.value && confirmPassword.value && passwordsMatch.value;
});

const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      const response = await $fetch('/api/signup', {
        method: 'POST',
        body: {
          username: username.value,
          email: email.value,
          password: password.value
        }
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to add user');
      }
      
      success.value = true;
      message.value = 'User added successfully!';
      username.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    } catch (error: any) {
      success.value = false;
      if (error.statusCode === 409) {
        message.value = 'Email is already taken.'
      } 
      else if (error.statusCode === 400) {
        message.value = 'Username must be at least 5 characters long'
      }
      else if (error.statusCode === 401) {
        message.value = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      }
      else {
        message.value = 'An error occurred. Please try again later.';
      }
    }
  }
};
</script>
