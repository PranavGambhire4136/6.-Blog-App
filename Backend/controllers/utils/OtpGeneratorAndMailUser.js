import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

export const generateOpt = () => {
    const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    });    
    return otp;
}

export const sendMail = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, 
            }
        })


        const mailOptions = {
            from: "Blog App",
            to: email,
            subject: "🔐 OTP Verification - Secure Your Account",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px; margin: auto;">
                    <h2 style="color: #4CAF50;">Your OTP Code</h2>
                    <p style="font-size: 16px; color: #333;">Use the following One-Time Password (OTP) to complete your verification:</p>
                    <h3 style="background: #f4f4f4; display: inline-block; padding: 10px 20px; border-radius: 5px; color: #000; font-weight: bold;">
                        ${otp}
                    </h3>
                    <p style="font-size: 14px; color: #666;">This OTP is valid for only 5 minutes. Do not share it with anyone.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
                </div>
            `
        };
        
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error while sending mail", error.message);
        return false;
    }    
}