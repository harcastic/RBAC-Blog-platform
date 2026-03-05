import Post from '../models/postModel.js';

//  CREATE BLOG ROUTE
const createPost = async (req, res) => {
    try {
        const { title, content }  = req.body;
        const post = await Post.create({title, content, author : req.user.id});

        return res.status(201).json({
            message : "post created successfully",
            post
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong! Please try again"
        })
    }
};
export default createPost;

// GET ALL BLOGS
// GET ALL BLOGS (Feed Route)
export const getAllBlogs = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Blogs fetched successfully",
            count: posts.length,
            posts
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

//  GET BLOGS ROUTE
export const getBlogsById = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        
        if(!post){
            return res.status(404).json({
                message : "post not found"
            })
        }

        return res.status(200).json({
            message : "blog found",
            post,
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

//  EDIT BLOG ROUTE
export const getEditPost = async(req , res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post) {
            return res.status(404).json({
                message : "ERROR! No blog found"
            });
        }

        return res.status(200).json({
            message : "Blog found!",
            post,
        })
    } 
    catch (error) {
        return res.status(500).json({
        message : "Server Error"
        })
    }
}

// UPDATE BLOG ROUTE
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = {title, content };

        const post = await Post.findByIdAndUpdate(id, updatedPost,{
            new : true,
            runValidators : true 
        });

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post updated successfully",
            post
        });
        
    }  
    catch (error) {
        res.status(500).json({
            message: "update failed",
        });
    }
}

// DESTORY BLOG ROUTE
export const deletePost = async (req, res) => {

    try {
        const { id } = req.params;
        const deletedBlog = await Post.findByIdAndDelete(id);

        if(!deletedBlog){
            return res.status(404).json({
                message : "Blog not found"
            })
        }

        return res.status(200).json({
            message : "blog deleted successfully",
            deletedBlog
        })
    } 
    catch (error) {
        res.status(500).json({
            message: "Blog deletion failed",
        });
    }
}