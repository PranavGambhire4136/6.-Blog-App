import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const isThere = (req, res, next) => {
    // console.log("getHeader started");
    console.log(req.cookies)
    const headerToken = req.cookies.token;
    // console.log("from getHeader",headerToken);

    if (headerToken) {
        const decode = jwt.verify(headerToken, process.env.JWT_SECRET);
        // console.log("getHeader decode",decode);
        req.user = decode;
    }
    if (!headerToken) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    console.log("getHeader completed");
    next();
}