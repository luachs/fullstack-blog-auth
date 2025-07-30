const express = require('express')
const router = express.Router()
const fs = require('fs')
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware')
const DB_PATH = './data/db.json'

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
router.post('/', authMiddleware, requireAdmin, (req, res) => {
  const { title, content } = req.body
  const db = readDB()
  const newBlog = {
    id: Date.now(),
    userId: req.user.id,
    title,
    content,
    createdAt: Date.now()
  }
  db.blogs.push(newBlog)
  writeDB(db)
  res.json({ success: true, data: newBlog, message: 'Tạo blog thành công' })
})

// ✅ CHỈ ADMIN được sửa blog
router.put('/:id', authMiddleware, requireAdmin, (req, res) => {
  const db = readDB()
  const blog = db.blogs.find(b => b.id == req.params.id)
  if (!blog) return res.status(404).json({ success: false, message: 'Không tìm thấy blog' })

  blog.title = req.body.title
  blog.content = req.body.content
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
