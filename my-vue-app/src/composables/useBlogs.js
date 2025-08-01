import { ref } from "vue"
import { getBlogs } from "../api/blog"

export function useBlogs() {
  const blogs = ref([])
  const loading = ref(false)
  const error = ref("")

  // ✅ Hỗ trợ search và sort
  const fetchBlogs = async ({ search = "", sort = "desc" } = {}) => {
    loading.value = true
    error.value = ""

    try {
      const res = await getBlogs({ search, sort })  // truyền đúng kiểu object
      blogs.value = res.data.data
    } catch (err) {
      error.value = "Không thể tải blog"
      console.error("❌ Lỗi khi gọi getBlogs:", err)
    } finally {
      loading.value = false
    }
  }

  return { blogs, loading, error, fetchBlogs }
}
