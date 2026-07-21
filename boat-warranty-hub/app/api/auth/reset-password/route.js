import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

export async function POST(request) {
    try {
        const { email, token, newPassword } = await request.json();

        if (!email || !token || !newPassword) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        if (newPassword.length < 8) {
             return NextResponse.json({ success: false, message: 'Password must be at least 8 characters' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.resetToken !== token || !user.resetTokenExpiry) {
            return NextResponse.json({ success: false, message: 'Invalid or expired reset token' }, { status: 400 });
        }

        if (user.resetTokenExpiry < new Date()) {
            return NextResponse.json({ success: false, message: 'Reset token has expired' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user
        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Password reset successfully',
        }, { status: 200 });

    } catch (error) {
        console.error('Error in reset-password:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to reset password'
        }, { status: 500 });
    }
}
