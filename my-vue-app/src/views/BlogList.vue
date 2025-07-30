<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Danh sách blog</h1>

    <div v-if="loading">Đang tải...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <ul v-else>
      <li
        v-for="blog in blogs"
        :key="blog.id"
        class="p-4 border mb-4 rounded shadow"
      >
        <h2 class="text-lg font-semibold">{{ blog.title }}</h2>
        <p class="text-sm text-gray-600 mb-2">{{ blog.content }}</p>

        <!-- Chỉ hiển thị khi là admin -->
        <div v-if="isAdmin" class="flex gap-2 mt-2">
          <button
            class="px-3 py-1 bg-yellow-400 text-black rounded"
            @click="editBlog(blog.id)"
          >
            Sửa
          </button>
          <button
            class="px-3 py-1 bg-red-500 text-white rounded"
            @click="deleteBlogHandler(blog.id)"
          >
            Xoá
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useBlogs } from "@/composables/useBlogs"
import { deleteBlog } from "@/api/blog"

const router = useRouter()
const { blogs, loading, error, fetchBlogs } = useBlogs()

// Lấy thông tin người dùng từ localStorage
const user = ref(null)
const isAdmin = computed(() => {
  return user.value && user.value.role === "admin"
})

onMounted(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (err) {
      console.error("Lỗi parse user từ localStorage", err)
    }
  }

  fetchBlogs()
})

const deleteBlogHandler = async (id) => {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xoá blog này không?")
  if (!confirmDelete) return

  try {
    await deleteBlog(id)
    fetchBlogs()
  } catch (err) {
    alert("Xảy ra lỗi khi xoá blog!")
    console.error(err)
  }
}

const editBlog = (id) => {
  router.push(`/edit/${id}`)
}
</script>
