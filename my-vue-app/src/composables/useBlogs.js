import { ref } from "vue"
import { getBlogs } from "../api/blog"

export function useBlogs() {
  const blogs = ref([])
  const loading = ref(false)
  const error = ref("")

  const fetchBlogs = async () => {
    loading.value = true
    error.value = ""
    try {
      const res = await getBlogs()
      blogs.value = res.data.data;
      console.log("✅ Kết quả từ getBlogs:", res.data.data) // <-- thêm dòng này
    } catch (err) {
      error.value = "Không thể tải blog";
      console.error("❌ Lỗi khi gọi getBlogs:", err) // <-- thêm dòng log lỗi
    } finally {
      loading.value = false
    }
  }

  return { blogs, loading, error, fetchBlogs }
}
