import {z} from "zod";

export const productSchema=z.object({
    serialNumber:z.string().min(1,"Serial number is required"),
    productName:z.string().min(1,"Product name is required"),
    purchaseDate: z.string().date().min(1,"Purchase date is required"),
    warrantyExpiry: z.string().min(1,"Warranty expiry is required"),
    isActive: z.boolean().optional()
});

export const registerSchema=z.object({
    name:z.string().min(3,"Name must be atleast less than 3 characters").max(50,"Name must not exceed more than 50 characters"),
    email:z.string().email("Invalid email address entered"),
    password:z.string().min(8,"Password musgt not be less than 8 characters"),
    phone:z.string().regex(/^[0-9]{10}$/,"Phone number must contain exactly 10 digits").optional()
})

export const loginSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(8, "Password must be at least 8 characters"),
});