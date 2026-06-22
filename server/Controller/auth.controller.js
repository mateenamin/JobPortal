import User from '../Model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role, company, phone } = req.body

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Sab fields do!'
      })
    }

    // Email check
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered!'
      })
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10)

    // User banao
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'jobseeker',
      company,
      phone
    })

    // Token banao
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.status(201).json({
      success: true,
      message: 'Register ho gaya!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email aur password do!'
      })
    }

    // User dhundo
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User nahi mila!'
      })
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password ghalat hai!'
      })
    }

    // Token banao
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.json({
      success: true,
      message: 'Login ho gaya!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}