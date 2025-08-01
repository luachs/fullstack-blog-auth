<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Thêm Blog Mới</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-medium">Tiêu đề</label>
        <input
          v-model="title"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Nhập tiêu đề blog"
          required
        />
      </div>

      <div>
        <label class="block font-medium">Nội dung</label>
        <textarea
          v-model="content"
          rows="6"
          class="w-full border rounded px-3 py-2"
          placeholder="Nhập nội dung blog"
          required
        ></textarea>
      </div>

      <div>
        <label class="block font-medium">Ảnh minh họa (tuỳ chọn)</label>
        <input type="file" @change="handleFileChange" accept="image/*" />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Thêm Blog
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "@/api/axiosInstance" // dùng axios trực tiếp

const router = useRouter()
const title = ref("")
const content = ref("")
const imageFile = ref(null)

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0]
}

const handleSubmit = async () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  if (!user || !token) {
    alert("Bạn cần đăng nhập để thêm blog")
    router.push("/login")
    return
  }

  const formData = new FormData()
  formData.append("title", title.value)
  formData.append("content", content.value)
  if (imageFile.value) {
    formData.append("image", imageFile.value)
  }

  try {
    await axios.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })

    alert("✅ Thêm blog thành công!")
    router.push("/")
  } catch (err) {
    console.error("❌ Upload lỗi:", err)
    alert("❌ Thêm blog thất bại!")
  }
}

</script>
