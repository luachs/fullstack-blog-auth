import { ref } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(!!localStorage.getItem("user"));
const user = ref(JSON.parse(localStorage.getItem("user")) || null);  // 👈 thêm dòng này

export function useAuth() {
  const router = useRouter();

  const checkLoginStatus = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      isLoggedIn.value = true;
    } else {
      user.value = null;
      isLoggedIn.value = false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 👈 nếu có token, cũng nên xoá
    user.value = null;
    isLoggedIn.value = false;
    router.push("/login");
  };

  return {
    isLoggedIn,
    user,               // 👈 thêm user vào
    checkLoginStatus,
    handleLogout,
  };
}
