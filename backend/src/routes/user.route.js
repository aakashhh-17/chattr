import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getMyFriends, getRecommendations, sendFriendRequest } from '../controllers/user.controller.js';

const router = express.Router();
// Apply auth middleware to all routes
router.use(protectRoute)

router.get('/', getRecommendations);
router.get('/friends', getMyFriends);

router.post('/friend-request/:id', sendFriendRequest)
router.put('/friend-request/:id/accept', acceptFriendRequest)

export default router;