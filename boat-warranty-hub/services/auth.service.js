import { createUser, findUserByEmail, findUserByEmailOrPhone } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

export async function registration(data){
    const { confirmPassword, ...userData } = data;

    const existingUser = await findUserByEmail(userData.email);

    if(existingUser){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await createUser({ ...userData, password: hashedPassword, role: 'USER'});

    const { password, ...safeUser } = user;

    return safeUser;
}


export async function loginUser({email,password}){

    const user = await findUserByEmailOrPhone(email);
    if(!user){
        throw new Error("Invalid email or password");
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

