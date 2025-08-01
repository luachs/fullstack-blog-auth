import axios from "./axiosInstance";

export const getBlogs = ({ search = "", sort = "desc" } = {}) =>
  axios.get("/blogs", {
    params: {
      search,
      sort,
    },
  });

export const getBlogById = (id) => axios.get(`/blogs/${id}`);

export const createBlog = (data) => axios.post("/blogs", data);

export const updateBlog = (id, data) => axios.put(`/blogs/${id}`, data);

export const deleteBlog = (id) => axios.delete(`/blogs/${id}`);

