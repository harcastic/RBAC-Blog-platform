import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/admin', verifyToken, authorizeRoles("admin"),  async (req, res) => {
    res.json({message : "Welcome Admin"});
})

router.get('/author', verifyToken, authorizeRoles("author"), async (req, res) => {
    res.json({message : "Welcome Manager"});
})

router.get('/reader' ,verifyToken, authorizeRoles("reader") ,async (req, res) =>{
    res.json({message : "welcome user"});
})

export default router;