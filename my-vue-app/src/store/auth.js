// stores/auth.js
import { defineStore } from "pinia"
import { login, register } from "@/api/auth"
import router from "@/router"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    error: null,
    loading: false,
  }),

  actions: {
    async loginUser(credentials) {
      this.loading = true
      try {
        const res = await login(credentials)
        
        this.user = res.data.data.user
        console.log("✅ Token:", res.data.data.token)
        console.log("✅ RES FULL:", res)
        console.log("✅ user", res.data.data.user)

        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.data.user))
        router.push("/")
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed"
      } finally {
        this.loading = false
      }
    },

   logout() {
  this.user = null
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  router.push("/login")  // ✅ Redirect về trang đăng nhập
}

  },
})
