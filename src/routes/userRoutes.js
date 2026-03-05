import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizedRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/admin', verifyToken, authorizedRoles("admin"),  async (req, res) => {
    res.json({message : "Welcome Admin"});
})

router.get('/author', verifyToken, authorizedRoles("author"), async (req, res) => {
    res.json({message : "Welcome Manager"});
})

router.get('/reader' ,verifyToken, authorizedRoles("reader") ,async (req, res) =>{
    res.json({message : "welcome user"});
})

export default router;