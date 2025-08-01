const express = require('express')
const router = express.Router()
const fs = require('fs')
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware')
const DB_PATH = './data/db.json'
const multer = require('multer')
const path = require('path')

const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  }
})

const upload = multer({ storage })

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH))
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// ✅ Ai cũng xem được
router.get('/', (req, res) => {
  const db = readDB()
  let blogs = db.blogs

  // Search & Sort
  const { search, sort } = req.query
  if (search) {
    blogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
  }
  if (sort === 'desc') {
    blogs = blogs.sort((a, b) => b.createdAt - a.createdAt)
  }

  res.json({ success: true, data: blogs })
})

// ✅ CHỈ ADMIN được tạo blog
router.post('/', authMiddleware, requireAdmin, upload.single('image'), (req, res) => {
 const { title, content } = req.body
 const db = readDB()
  const newBlog = {
  id: Date.now(),
  userId: req.user.id,
  title,
  content,
  createdAt: Date.now(),
  fileUrl: req.file ? `/uploads/${req.file.filename}` : null
}
  db.blogs.push(newBlog)
  writeDB(db)
  res.json({ success: true, data: newBlog, message: 'Tạo blog thành công' })
})

// ✅ Lấy blog theo ID (ai cũng xem được)
router.get('/:id', (req, res) => {
  const db = readDB()
  const id = Number(req.params.id)  // Ép kiểu để tránh so sánh sai
  const blog = db.blogs.find(b => b.id === id)

  if (!blog) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy blog' })
  }

  res.json(blog) // hoặc: res.json({ success: true, data: blog })
})

// ✅ CHỈ ADMIN được sửa blog
// ✅ CHỈ ADMIN được sửa blog (CÓ CẬP NHẬT ẢNH)
router.put('/:id', authMiddleware, requireAdmin, upload.single('image'), (req, res) => {
  const db = readDB()
  const blog = db.blogs.find(b => b.id == req.params.id)
  if (!blog) return res.status(404).json({ success: false, message: 'Không tìm thấy blog' })

  // Cập nhật thông tin mới
  blog.title = req.body.title
  blog.content = req.body.content

  // Nếu có ảnh mới
  if (req.file) {
    // Nếu đã có ảnh cũ, xóa đi (nếu tồn tại)
    if (blog.fileUrl) {
      const oldPath = path.join(__dirname, "..", blog.fileUrl)
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
    }

    // Cập nhật ảnh mới
    blog.fileUrl = `/uploads/${req.file.filename}`
  }

  writeDB(db)
  res.json({ success: true, data: blog, message: 'Cập nhật thành công' })
})

// ✅ CHỈ ADMIN được xoá blog
router.delete('/:id', authMiddleware, requireAdmin, (req, res) => {
  const db = readDB()
  db.blogs = db.blogs.filter(b => b.id != req.params.id)
  writeDB(db)
  res.json({ success: true, message: 'Xoá thành công' })
})

module.exports = router
