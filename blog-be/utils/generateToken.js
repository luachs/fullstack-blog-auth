const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role // ✅ thêm role
    },
    'my-secret-key',
    { expiresIn: '7d' }
  );
};

module.exports = { generateToken };
