import { ref } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(!!localStorage.getItem("user"));

export function useAuth() {
  const router = useRouter();

  const checkLoginStatus = () => {
    isLoggedIn.value = !!localStorage.getItem("user");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    isLoggedIn.value = false;
    router.push("/login");
  };

  return {
    isLoggedIn,
    checkLoginStatus,
    handleLogout,
  };
}
