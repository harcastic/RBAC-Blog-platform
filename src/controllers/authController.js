import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

import User from "../models/userModel.js";

const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
        const hassedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({username, email, password: hassedPwd, role});

        return res.status(201).json({
            message : `User registered successfully - ${username}`,
            user
        })
    } 
    catch(err) {
        return res.status(500).json({
            message : "Server error",
        })
    }
};
export default register;

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({
                message : `User with username - ${username} not found`,     
            })
        }
        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch) {
            return res.status(400).json({
                message : "Invalid credential",     
            })
        }

        const token = jwt.sign(
            { id : user._id, role : user.role},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        );

        res.status(200).json({token});
    } 
    catch(error){
        return res.status(500).json({
            message : "Login failed or Something went wrong"
        })
    }
};