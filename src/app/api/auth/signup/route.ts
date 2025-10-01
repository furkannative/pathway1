import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { companyName, email, password } = await request.json();

    // Validate input
    if (!companyName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create company and user
    const hashedPassword = await hash(password, 10);
    
    const company = await prisma.company.create({
      data: {
        name: companyName,
        size: '', // Will be set during onboarding
        industry: '', // Will be set during onboarding
      },
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        companyId: company.id,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      companyId: company.id,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
