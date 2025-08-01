<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">MyBlog</h1>

      <!-- ✅ CHỈ admin được thấy nút Add -->
      <template v-if="isLoggedIn && user?.role === 'admin'">
        <router-link to="/add" class="hover:underline">Add Blog</router-link>
      </template>

      <nav class="flex items-center gap-4">
        <router-link to="/" class="hover:underline">Trang chủ</router-link>
        <router-link to="/profile" class="hover:underline">Profile</router-link>

        <template v-if="isLoggedIn">
          <button @click="handleLogout" class="hover:underline text-left">Logout</button>
        </template>

        <template v-else>
          <router-link to="/login" class="hover:underline">Login</router-link>
          <router-link to="/register" class="hover:underline">Register</router-link>
        </template>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-grow p-4 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const route = useRoute();
const { isLoggedIn, user, checkLoginStatus, handleLogout } = useAuth();

onMounted(() => {
  checkLoginStatus();

});

watch(route, () => {
  checkLoginStatus();
});
</script>
