export const routes = [
  { path: '/', component: () => import('@/views/BlogList.vue') },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/register', component: () => import('@/views/Register.vue') },
  { path: '/profile', component: () => import('@/views/Profile.vue') },
  { path: '/blog/new', component: () => import('@/views/BlogForm.vue') },
  { path: '/blog/edit/:id', component: () => import('@/views/BlogForm.vue'), props: true },
  {path: "/add",name: "AddBlog",component: () => import("@/views/AddBlog.vue"),
}

];
