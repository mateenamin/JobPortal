import jwt from 'jsonwebtoken'
import User from '../Model/user.model.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Login karo pehle!'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()

  } catch (error) {
    res.status(401).json({ success: false, message: 'Token ghalat hai!' })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Sirf admin access!'
    })
  }
  next()
}

export const companyOnly = (req, res, next) => {
  if (req.user.role !== 'company') {
    return res.status(403).json({
      success: false,
      message: 'Sirf company access!'
    })
  }
  next()
}