<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/store/auth"

const router = useRouter()
const email = ref("")
const password = ref("")

const auth = useAuthStore()
onMounted(() => {
  // Nếu localStorage có user nhưng auth.user chưa có
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    auth.user = JSON.parse(storedUser) // ⚠️ Gán lại để Pinia reactive
    router.push("/") // ✅ Tự động chuyển về trang chủ
  }
})

const handleLogin = async () => {
  await auth.loginUser({
    email: email.value,
    password: password.value
  })
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
    >
      <h2 class="text-2xl font-semibold text-center">Đăng nhập</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Mật khẩu"
        class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        :disabled="auth.loading"
        class="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {{ auth.loading ? "Đang đăng nhập..." : "Đăng nhập" }}
      </button>

      <p v-if="auth.error" class="text-red-500 text-sm text-center">
        {{ auth.error }}
      </p>
    </form>
  </div>
</template>
