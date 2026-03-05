import Post from "../models/postModel";
import express from 'express';
// import {uuid.V4} from 'uuid';
import createPost, { deletePost, updatePost } from "../controllers/postController";

const router = express.Router();

// Index
router.get('/', )
// Create 
router.post('/:id', createPost);
// Edit
router.get("/")
// Update 
router.put('/:id', updatePost);
// Delete
router.delete('/:id', deletePost);