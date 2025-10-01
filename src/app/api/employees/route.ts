import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        employees: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Error fetching employees' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Check if employee with same name exists
    const existingEmployee = await prisma.employee.findFirst({
      where: { name: data.name },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Employee with this name already exists' },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.create({
      data,
      include: {
        manager: true,
        employees: true,
      },
    });
    
    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: 'Error creating employee' },
      { status: 500 }
    );
  }
}
