import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../lib/prisma';
import { sendPasswordResetEmail } from '../../../../services/email.service';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // We return success even if user not found to prevent email enumeration
            return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' }, { status: 200 });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Save token to user
        await prisma.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiry,
            }
        });

        // Send email
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
        await sendPasswordResetEmail(email, resetLink);

        return NextResponse.json({
            success: true,
            message: 'If an account exists, a reset link has been sent.',
        }, { status: 200 });

    } catch (error) {
        console.error('Error in forgot-password:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to process forgot password request'
        }, { status: 500 });
    }
}
