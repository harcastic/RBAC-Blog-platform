import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';



dbConnect();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("RBAC Server Running ");
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);


app.listen(port , ()=>{
    console.log(`Server is running at ${port}`);
}) 