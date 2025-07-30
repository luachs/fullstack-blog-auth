<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Thêm Blog Mới</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-medium">Tiêu đề</label>
        <input
          v-model="title"
          type="text"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Nhập tiêu đề blog"
          required
        />
      </div>

      <div>
        <label class="block font-medium">Nội dung</label>
        <textarea
          v-model="content"
          rows="6"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Nhập nội dung blog"
          required
        ></textarea>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createBlog } from "@/api/blog"; // API phía dưới

const router = useRouter();
const title = ref("");
const content = ref("");

const handleSubmit = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Bạn cần đăng nhập để thêm blog");
    router.push("/login");
    return;
  }

  const data = {
    title: title.value,
    content: content.value,
    userId: user.id,
  };

  try {
    await createBlog(data);
    alert("Thêm blog thành công!");
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Thêm blog thất bại!");
  }
};
</script>
