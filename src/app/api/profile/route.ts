// app/api/profile/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/options';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Return user data without sensitive fields
    const { ...userData } = user;
    // Removed console.log(password)
    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ 
      error: 'Error fetching profile', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Fields to update
    const {
      firstName,
      lastName,
      currentJobTitle,
      currentCompany,
      currentLocation,
      linkedinUrl,
      instagramUrl,
      twitterUrl,
      githubUrl,
      websiteUrl,
      bio,
      profilePhotoUrl,
      graduationYear,
      phone
    } = data;
    
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        firstName,
        lastName,
        currentJobTitle,
        currentCompany,
        currentLocation,
        linkedinUrl,
        instagramUrl,
        twitterUrl,
        githubUrl,
        websiteUrl,
        bio,
        profilePhotoUrl,
        graduationYear: graduationYear ? parseInt(graduationYear, 10) : undefined,
        phone
      },
    });
    
    // Return updated user data without sensitive fields
    const { ...userData } = updatedUser;
    // Removed console.log(password)
    return NextResponse.json({ user: userData, message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ 
      error: 'Error updating profile', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}