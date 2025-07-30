<template>
  <div v-if="blog">
    <h2 class="text-2xl font-bold mb-4">Chỉnh sửa Blog</h2>

    <form @submit.prevent="handleUpdate">
      <div class="mb-4">
        <label class="block font-semibold mb-1">Tiêu đề:</label>
        <input
          v-model="blog.title"
          type="text"
          class="w-full border rounded p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-semibold mb-1">Nội dung:</label>
        <textarea
          v-model="blog.content"
          class="w-full border rounded p-2"
          rows="6"
          required
        ></textarea>
      </div>

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

const handleUpdate = async () => {
  try {
    await updateBlog(blog.value.id, blog.value)
    alert("Cập nhật blog thành công!")
    router.push("/")
  } catch (err) {
    console.error("Lỗi khi cập nhật:", err)
    alert("Cập nhật thất bại!")
  }
}
</script>
