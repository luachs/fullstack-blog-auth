<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Danh sách blog</h1>

    <!-- 🔍 Tìm kiếm + Sắp xếp -->
    <div class="mb-4 flex gap-2 items-center">
      <input
        v-model="searchTerm"
        @keydown.enter="handleSearch"
        type="text"
        placeholder="Tìm blog theo tiêu đề..."
        class="border px-3 py-2 rounded w-full"
      />
      <select v-model="sortOrder" @change="handleSearch" class="border px-2 py-2 rounded">
        <option value="desc">Mới nhất</option>
        <option value="asc">Cũ nhất</option>
      </select>
      <button
        @click="handleSearch"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Tìm
      </button>
    </div>

    <!-- ⏳ Trạng thái -->
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- 📋 Danh sách blog -->
    <ul v-else>
      <li
        v-for="blog in blogs"
        :key="blog.id"
        class="p-4 border mb-4 rounded shadow"
      >
      <!-- Thêm dòng log ở đây -->
        <h2 class="text-lg font-semibold">{{ blog.title }}</h2>

        <!-- ✅ Hiển thị ảnh nếu có fileUrl -->
        <!-- Hiển thị ảnh nếu có -->
      <div v-if="blog.fileUrl" class="my-2">
        <img :src="getFullImageUrl(blog.fileUrl)" alt="Ảnh minh họa" class="max-h-48 object-cover rounded" />
      </div>


        <p class="text-sm text-gray-600 mb-2">{{ blog.content }}</p>

        <!-- 🛠 Hành động admin -->
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
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useBlogs } from "@/composables/useBlogs"
import { deleteBlog } from "@/api/blog"

const router = useRouter()
const { blogs, loading, error, fetchBlogs } = useBlogs()

// 👤 Người dùng
const user = ref(null)
const isAdmin = computed(() => user.value && user.value.role === "admin")

// 🔍 State tìm kiếm + sắp xếp
const searchTerm = ref("")
const sortOrder = ref("desc")

// ✅ Tải blog khi mounted
onMounted(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (err) {
      console.error("Lỗi parse user từ localStorage", err)
    }
  }

  fetchBlogs({ search: searchTerm.value.trim(), sort: sortOrder.value })
})

// 🔍 Xử lý tìm kiếm + sắp xếp
const handleSearch = () => {
  fetchBlogs({ search: searchTerm.value.trim(), sort: sortOrder.value })
}

// 🗑 Xoá blog
const deleteBlogHandler = async (id) => {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xoá blog này không?")
  if (!confirmDelete) return

  try {
    await deleteBlog(id)
    handleSearch()
  } catch (err) {
    alert("Xảy ra lỗi khi xoá blog!")
    console.error(err)
  }
}

// 🖼️ Tạo URL ảnh đầy đủ từ đường dẫn image backend trả về
const getFullImageUrl = (path) => {
  if (!path) return ""
  const base = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "")
  return `${base}${path}`
}


// ✏️ Sửa blog
const editBlog = (id) => {
  router.push(`/blog/edit/${id}`)
}

</script>
