import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
import createPost, { deletePost, getAllBlogs, getBlogsById, updatePost } from "../controllers/postController.js";

const router = express.Router();

// GET ALL BLOGS
router.get('/', getAllBlogs);

// GET SINGLE BLOG
router.get('/:id', getBlogsById);

// CREATE BLOG
router.post('/', verifyToken, authorizeRoles("author"), createPost);

// UPDATE  BLOG
router.put('/:id', verifyToken, authorizeRoles("author"), updatePost);

// Delete BLOG
router.delete('/:id', verifyToken, authorizeRoles("admin"), deletePost);

export default router;