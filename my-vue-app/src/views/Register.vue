<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Đăng ký</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
          <input
            v-model="name"
            type="text"
            placeholder="Nhập họ tên"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Nhập email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            placeholder="Nhập mật khẩu"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Đăng ký
        </button>

        <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { register } from "@/api/auth" // đúng theo setup bạn có

const name = ref("")
const email = ref("")
const password = ref("")
const error = ref("")
const router = useRouter()

const handleRegister = async () => {
  error.value = ""
  try {
    const res = await register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    const user = res.data.data
    localStorage.setItem("user", JSON.stringify(user))
    router.push("/") // hoặc push về /login
  } catch (err) {
    error.value =
      err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
  }
}
</script>
