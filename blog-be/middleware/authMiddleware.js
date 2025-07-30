const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Không có token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, 'my-secret-key')
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token không hợp lệ' })
  }
}

// 👉 Middleware kiểm tra quyền admin
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Chỉ admin được phép thực hiện thao tác này' })
  }
  next()
}

module.exports = {
  authMiddleware,
  requireAdmin
}
