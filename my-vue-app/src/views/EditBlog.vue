<template>
  <div v-if="blog">
    <h2 class="text-2xl font-bold mb-4">Chỉnh sửa Blog</h2>

    <form @submit.prevent="handleUpdate">
      <!-- Tiêu đề -->
      <div class="mb-4">
        <label class="block font-semibold mb-1">Tiêu đề:</label>
        <input
          v-model="blog.title"
          type="text"
          class="w-full border rounded p-2"
          required
        />
      </div>

      <!-- Nội dung -->
      <div class="mb-4">
        <label class="block font-semibold mb-1">Nội dung:</label>
        <textarea
          v-model="blog.content"
          class="w-full border rounded p-2"
          rows="6"
          required
        ></textarea>
      </div>

      <!-- Ảnh hiện tại -->
      <div v-if="blog.fileUrl" class="mb-4">
        <p class="font-semibold mb-1">Ảnh hiện tại:</p>
        <img
          :src="getImageUrl(blog.fileUrl)"
          alt="Ảnh hiện tại"
          class="max-h-48 rounded"
        />
      </div>

      <!-- Chọn ảnh mới -->
      <div class="mb-4">
        <label class="block font-semibold mb-1">Ảnh mới (nếu muốn thay):</label>
        <input type="file" @change="handleFileChange" accept="image/*" />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cập nhật
      </button>
    </form>
  </div>

  <div v-else>
    <p>Đang tải blog...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getBlogById, updateBlog } from "@/api/blog"

const route = useRoute()
const router = useRouter()
const blog = ref(null)
const selectedFile = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await getBlogById(id)
    blog.value = res.data
  } catch (err) {
    console.error("Không thể tải blog:", err)
    alert("Không tìm thấy blog.")
    router.push("/")
  }
})

// Khi chọn ảnh mới
const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
  }
}

// Tạo URL để hiển thị ảnh
const getImageUrl = (path) => {
  const base = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "")
  return `${base}${path}`
}

// Gửi cập nhật blog
const handleUpdate = async () => {
  try {
    const formData = new FormData()
    formData.append("title", blog.value.title)
    formData.append("content", blog.value.content)

    if (selectedFile.value) {
      formData.append("image", selectedFile.value)
    }

    await updateBlog(blog.value.id, formData)
    alert("Cập nhật blog thành công!")
    router.push("/")
  } catch (err) {
    console.error("Lỗi khi cập nhật:", err)
    alert("Cập nhật thất bại!")
  }
}
</script>
