import Post from '../models/postModel.js';

//  CREATE BLOG ROUTE
const createPost = async (req, res) => {
    try {
        const { title, content }  = req.body;

        if(!title || !content){
            return res.status(400).json({
                message: "Title and content required"
            });
        }

        const post = await Post.create({title, content, author : req.user.id});
        console.log(post);

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
export const getAllBlogs = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Blogs fetched successfully",
            page,
            limit,
            posts
        });

    } 
    catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

//  GET SINGLE BLOGS ROUTE / EDIT ROUTE
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

// UPDATE BLOG ROUTE
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            })
        }

        if(post.author.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({
                message : "user not authorized"
            });
        }
        
        const { title, content } = req.body;
        post.title = title;
        post.content = content;
        await post.save();

        return res.status(200).json({
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
        const post = await Post.findById(id);
        
        if(!post){
            return res.status(404).json({
                message : "Blog not found"
            })
        }   

        if(post.author.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({
                message : "Not authorized"
            })
        }

        const deletedBlog = await Post.findByIdAndDelete(id);

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