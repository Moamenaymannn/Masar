import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { otpService } from "@/app/lib/services/otpService";
import { logInfo, logError, logWarning } from "@/app/lib/services/logger";

import { prisma } from "@/app/lib/prisma";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    logInfo("Register request received");
    const { firstName, lastName, email, password } = await req.json();
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      logWarning(`Registration attempt with existing email: ${email}`);
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        firstName, 
        lastName, 
        email, 
        password: hashedPassword,
        isEmailVerified: false
      },
    });
    
    // Generate and send OTP
    const otp = otpService.generateOTP();
    const emailSent = await otpService.sendOTPEmail(email, otp, firstName);
    
    if (!emailSent) {
      logError(new Error("Failed to send OTP email"), { email });
      return NextResponse.json({ error: "Registration successful but failed to send verification email" }, { status: 500 });
    }

    // Save OTP to database
    const otpSaved = await otpService.saveOTP(email, otp);
    
    if (!otpSaved) {
      logError(new Error("Failed to save OTP"), { email });
      return NextResponse.json({ error: "Registration successful but failed to save verification code" }, { status: 500 });
    }

    logInfo(`User registered and OTP sent: ${email}`);
    return NextResponse.json({ 
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      message: "Registration successful! Please check your email for verification code.",
      requiresVerification: true
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('[REGISTER_ERROR]', errorMessage, errorStack);
    logError(error as Error, { route: "register" });
    return NextResponse.json({ 
      error: "Internal server error", 
      message: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}