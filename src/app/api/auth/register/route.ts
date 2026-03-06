import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole, UserStatus, SupplierStatus, AffiliateStatus } from '@prisma/client';
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

    // Determine role with type safety
    const userRole: UserRole = (role && ['CUSTOMER', 'SUPPLIER', 'AFFILIATE', 'ADMIN', 'SUPER_ADMIN'].includes(role.toUpperCase())) 
      ? role.toUpperCase() as UserRole 
      : 'CUSTOMER';

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: userRole,
        status: 'ACTIVE' as UserStatus,
      },
    });

    // Create supplier profile if role is SUPPLIER
    if (userRole === 'SUPPLIER') {
      await prisma.supplierProfile.create({
        data: {
          userId: user.id,
          businessName: name,
          governorate: 'Cairo',
          walletBalance: 0,
          rating: 0,
          totalReviews: 0,
          status: 'PENDING' as SupplierStatus,
        },
      });
    }

    // Create affiliate profile if role is AFFILIATE
    if (userRole === 'AFFILIATE') {
      await prisma.affiliateProfile.create({
        data: {
          userId: user.id,
          referralCode: `REF${user.id.substring(0, 8).toUpperCase()}`,
          commissionRate: 5,
          totalEarnings: 0,
          status: 'PENDING' as AffiliateStatus,
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
