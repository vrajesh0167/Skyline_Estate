import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/auth.router.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('Database connected successfully');
}).catch((err) =>{
    console.log(err);
})

app.use(express.json());

app.use('/api/user', userRouter)

app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})