import { NextResponse } from 'next/server';
import { sendOtpEmail } from '../../../../services/email.service';
import { prisma } from '../../../../lib/prisma';

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const otpCode = generateOTP();
        // OTP valid for 10 minutes
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Save OTP to database (upsert to handle re-sending to same email)
        await prisma.otp.upsert({
            where: { email },
            update: {
                code: otpCode,
                expiresAt,
                createdAt: new Date(),
            },
            create: {
                email,
                code: otpCode,
                expiresAt,
            },
        });

        // Send Email
        await sendOtpEmail(email, otpCode);

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
        }, { status: 200 });

    } catch (error) {
        console.error('Error in send-otp:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to send OTP'
        }, { status: 500 });
    }
}
