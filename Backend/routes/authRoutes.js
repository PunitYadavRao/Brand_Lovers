import express from 'express'
import { signup, login, getProfile } from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/**
 * @route POST /auth/signup
 * @description Register a new user
 * @body {email, password, name}
 * @returns {user, token}
 */
router.post('/signup', signup)

/**
 * @route POST /auth/login
 * @description Login user and return JWT token
 * @body {email, password}
 * @returns {user, token}
 */
router.post('/login', login)

/**
 * @route GET /auth/profile
 * @description Get current user profile (Protected)
 * @headers Authorization: Bearer <token>
 * @returns {user}
 */
router.get('/profile', verifyToken, getProfile)

export default router
