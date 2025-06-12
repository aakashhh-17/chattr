import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommendations } from '../controllers/user.controller.js';

const router = express.Router();
// Apply auth middleware to all routes
router.use(protectRoute)

router.get('/', getRecommendations);
router.get('/friends', getMyFriends)

export default router;