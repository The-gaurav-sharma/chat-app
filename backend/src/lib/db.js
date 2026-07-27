import mongoose from "mongoose";

export async function connectDB(){
    try {
        
        const mongoUri = process.env.MONGODB_URI;
        
        if(!mongoUri){
            throw new Error("MongoDb URI is required");
        }

        const conn = await mongoose.connect(mongoUri);
        console.log("Moongoose Connected Successfully", conn.connection.host)
    } catch (error) {
         console.log("MongoDb connection Error", error.message)
         process.exit(1);
         //1 -> fail
         //0 -> success        
    }
}