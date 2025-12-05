import express from 'express'
import { signup, login, getProfile, updateProfile, deleteProfile, changePassword, adminLogin } from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/admin/login', adminLogin)
router.get('/profile', verifyToken, getProfile)
router.put('/profile', verifyToken, updateProfile)
router.delete('/profile', verifyToken, deleteProfile)
router.put('/change-password', verifyToken, changePassword)

export default router

