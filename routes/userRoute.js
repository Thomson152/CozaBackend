
import express from 'express'
import { authUser, getUser, getUserProfile } from '../controllers/userControllers.js'
const router = express.Router()

import {protect} from '../middleware/authMiddlewares.js'

router.route('/').post().get(protect, getUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect,  getUserProfile)


export default router