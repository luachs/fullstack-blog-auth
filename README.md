# 📚 E-Learning Blog App (Fullstack)

Ứng dụng blog đơn giản gồm giao diện người dùng (Vue.js) và máy chủ backend (Node.js + Express), phục vụ cho việc học và thực hành lập trình Web.

---

## 📁 Cấu trúc thư mục

```
elearning4/
├── blog-be/          # Backend - Node.js + Express
├── my-vue-app/       # Frontend - Vue 3 + Vite
├── postman_collection.json  # API mẫu để test trong Postman
└── README.md         # Hướng dẫn tổng
```

---

## 🚀 Cách chạy dự án

### 1. Chuẩn bị môi trường

Cần cài đặt trước:
- [Node.js](https://nodejs.org/) (>= v16)
- [npm](https://www.npmjs.com/)
- (Tuỳ chọn) [Postman](https://www.postman.com/) để test API

---

### 2. Chạy Backend (server)

```bash
cd blog-be
npm install
node server.js
```

> Server backend sẽ chạy tại `http://localhost:8080`

---

### 3. Chạy Frontend (client)

Mở tab terminal mới:

```bash
cd my-vue-app
npm install
npm run dev
```

> Giao diện Vue sẽ chạy tại `http://localhost:5173`

---

### 4. Kết nối giữa FE và BE

- FE sẽ gửi request đến `http://localhost:8080/api/...`
- Nếu chạy ở server online (Railway, Vercel...), cần cập nhật địa chỉ API trong Vue project

---

## 📮 Test API bằng Postman

- Mở Postman
- Import file `postman_collection.json`
- Gửi các request mẫu đã có sẵn

---

## 🗃️ Database

- API đang sử dụng file `db.json` hoặc mô phỏng database (tuỳ cấu hình trong backend).
- Nếu dùng cơ sở dữ liệu thật (MySQL, MongoDB...) cần cập nhật thêm.

---
