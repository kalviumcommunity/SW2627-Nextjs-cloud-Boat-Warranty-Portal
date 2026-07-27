import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import logger from "./lib/logger";


const PUBLIC_ROUTES = [
    "/api/health",
    "/api/dashboard/stats"
];


export async function middleware(request){
    const pathname = request.nextUrl.pathname;
    logger.info({
        method: request.method,
        path: pathname,
    }, "Incoming Request");
    const isPublicRoute = pathname.startsWith("/api/auth") || pathname.startsWith("/api/warranty") || PUBLIC_ROUTES.includes(pathname);

    if(isPublicRoute){
        return NextResponse.next();
    }

    const token = await getToken({
        req:request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if(!token){
        logger.warn({
        path: pathname,
        }, "Unauthorized access attempt");
        return NextResponse.json({
            success:false,
            message:"Unauthorized"
        },{status:401});
    }

    const ADMIN_ONLY_ROUTES = [
        { path: "/api/dashboard", methods: ["GET", "POST", "PUT", "DELETE"] },
        { path: "/api/products", methods: ["POST", "PUT", "DELETE"] },
        { path: "/api/repairs", methods: ["GET", "POST", "PUT", "DELETE"] }
    ];

    const isAdminRequired = ADMIN_ONLY_ROUTES.some(route => 
        pathname.startsWith(route.path) && route.methods.includes(request.method)
    );

    if (isAdminRequired && token.role !== "ADMIN") {
        logger.warn({ path: pathname, userId: token.id, role: token.role }, "Forbidden access attempt");
        return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    logger.info({
        userId: token.id,
        role: token.role,
        path: pathname,
    }, "Authenticated request");

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",
    ],
};