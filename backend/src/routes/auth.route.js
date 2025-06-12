import express from 'express'
import { logIn, logOut, onBoard, signUp } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/logout', logOut)
router.post('/onboarding', protectRoute, onBoard)

router.get('/me', protectRoute, (req, res)=>{
    res.status(200).json({success:true, user: req.user})
})

export default router;