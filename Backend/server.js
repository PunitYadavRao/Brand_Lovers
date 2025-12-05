import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import { errorHandler } from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://brand-lovers.vercel.app',
  'https://brand-lovers-yrp1.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now, can be restricted later
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Brand Lovers API is running'
  })
})

app.use('/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/contact', contactRoutes)

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`Auth routes: http://localhost:${PORT}/auth/*`)
})

export default app


