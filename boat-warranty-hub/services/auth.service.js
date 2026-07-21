import { createUser, findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

import {prisma} from "@/lib/prisma";

export async function registration(data){
    const { otp, ...userData } = data;

    const existingUser = await findUserByEmail(userData.email);

    if(existingUser){
        throw new Error("User already exists");
    }

    // Verify OTP
    const otpRecord = await prisma.otp.findUnique({
        where: { email: userData.email }
    });

    if (!otpRecord) {
        throw new Error("OTP not found or expired. Please request a new one.");
    }

    if (otpRecord.code !== otp) {
        throw new Error("Invalid OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
        throw new Error("OTP has expired");
    }

    const hashedPassword = await bcrypt.hash(userData.password,10);

    const user = await createUser({...userData, password:hashedPassword, role:'USER', isVerified: true});

    // Delete OTP after successful registration
    await prisma.otp.delete({ where: { email: userData.email } });

    const {password, ...safeUser} = user;

    return safeUser;
}


export async function loginUser({email,password}){

    // console.log(email)
    // console.log(password)
    const user = await findUserByEmail(email);
    if(!user){
        throw new Error("Invalid email or password")
    }

    const isPassword = await bcrypt.compare(password,user.password);
    // console.log(user.password)
    // console.log(password)
    if(!isPassword){
        throw new Error("Invalid password or email");
    }

    const {password:_,...safeUser}=user;

    return safeUser;
}

