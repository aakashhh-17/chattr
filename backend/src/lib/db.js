import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${conn.connection.host} `)
    } catch (error) {
        console.log('Error in connecting mongoDB', error);
        process.exit(1);    //1 means failure
        
    }
}