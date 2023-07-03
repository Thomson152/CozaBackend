import express from 'express'
const router = express.Router()
import {
  addOrderItems,
} from '../controllers/orderControllers.js'
import { protect, admin } from '../middleware/authMiddlewares.js'

router.route('/').post(protect, addOrderItems)


export default router