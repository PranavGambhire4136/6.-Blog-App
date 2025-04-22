import express from "express";
import { configDotenv } from "dotenv";
import { connectDb } from "./config/connectDb.js";
import { cloudinaryConnect } from "./config/connectCloudinary.js";
import router from "./Routes/index.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";


const app = express();

configDotenv();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://192.168.31.65:8081', // Adjust this based on your Expo dev/prod URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.get("/", (req, res) => {
    res.send("|| Shree Ganeshya Namah ||");
});

app.use("/api/vi", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connectDb();
    cloudinaryConnect();
});