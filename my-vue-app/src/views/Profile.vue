<template>
  <div v-if="user">
    <h2 class="text-2xl font-bold mb-4">Thông tin người dùng</h2>
    <p><strong>Tên:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>ID:</strong> {{ user.id }}</p>
  </div>
  <div v-else>
    <p class="text-red-500">Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const user = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (err) {
      console.error("Không thể parse user từ localStorage:", err)
    }
  }
})
</script>
