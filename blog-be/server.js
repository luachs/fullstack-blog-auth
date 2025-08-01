const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blog')

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/uploads', express.static('uploads'))


app.listen(3001, () => {
  console.log('Backend server is running on http://localhost:3001')
})
