import "dotenv/config"
import {prisma} from "../lib/prisma.js"
import bcrypt from "bcryptjs";


const ADMIN_EMAIL="admin@boat.com";
const ADMIN_PASSWORD="admin123";

async function main(){
    const admin = await prisma.user.findUnique({
        where:{
            email:ADMIN_EMAIL,
        }
    })

    if(admin){
       console.log("admin already exists");
       return; 
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD,10);

    await prisma.user.create({
        data:{
            name:"BOAT Admin",
            email:ADMIN_EMAIL,
            password:hashedPassword,
            role:"ADMIN",
            phone:null,
        }
    });

    console.log("Admin created successfully.")
}

main()
.catch(console.error)
.finally(async()=>{
    await prisma.$disconnect();
})