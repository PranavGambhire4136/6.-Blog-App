import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB connection issue");
        console.log(err);
    });
}
