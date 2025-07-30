const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const router = express.Router()
const { generateToken } = require('../utils/generateToken')

const DB_PATH = './data/db.json'

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH))
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

router.post('/register', (req, res) => {
  const { name, email, password, role = "user" } = req.body; // nếu không có role thì mặc định là "user"
  const db = readDB();

  const exists = db.users.find(u => u.email === email);
  if (exists) return res.status(400).json({ success: false, message: 'Email đã tồn tại' });

  const hashed = bcrypt.hashSync(password, 8);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    role // 👈 thêm vào đây
  };

  db.users.push(newUser);
  writeDB(db);

  res.json({
    success: true,
    data: { id: newUser.id, name, email, role },
    message: 'Đăng ký thành công'
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body
  const db = readDB()

  const user = db.users.find(u => u.email === email)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Sai email hoặc mật khẩu' })
  }

  const token = generateToken({ id: user.id, role: user.role })

    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } })
})

module.exports = router
