import User from '../Model/user.model.js'
import bcrypt from 'bcryptjs'

const adminSeeder = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@jobportal.com' })
    if (existing) return console.log('Admin already hai!')

    const hashed = await bcrypt.hash('admin123', 10)
    await User.create({
      name: 'Admin',
      email: 'admin@jobportal.com',
      password: hashed,
      role: 'admin'
    })
    console.log('Admin ban gaya! ')
  } catch (error) {
    console.log('Seeder Error:', error.message)
  }
}

export default adminSeeder