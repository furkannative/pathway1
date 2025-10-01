import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { companySize, industry } = await request.json();

    // Validate input
    if (!companySize || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Get user/company ID from session
    // For now, we'll use the latest company as a placeholder
    const company = await prisma.company.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Update company details
    const updatedCompany = await prisma.company.update({
      where: { id: company.id },
      data: {
        size: companySize,
        industry,
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    );
  }
}
