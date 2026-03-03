import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, role } = body;

    // Validation
    if (!name || !email || !password) {
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
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: role || 'CUSTOMER',
        status: 'ACTIVE',
      },
    });

    // Create supplier profile if role is SUPPLIER
    if (role === 'SUPPLIER') {
      await prisma.supplierProfile.create({
        data: {
          userId: user.id,
          businessName: name,
          governorate: 'Cairo',
          walletBalance: 0,
          rating: 0,
          totalReviews: 0,
          status: 'PENDING',
        },
      });
    }

    // Create affiliate profile if role is AFFILIATE
    if (role === 'AFFILIATE') {
      await prisma.affiliateProfile.create({
        data: {
          userId: user.id,
          referralCode: `REF${user.id.substring(0, 8).toUpperCase()}`,
          commissionRate: 5,
          totalEarnings: 0,
          status: 'PENDING',
        },
      });
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
