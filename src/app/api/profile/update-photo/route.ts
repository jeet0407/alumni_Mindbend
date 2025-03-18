import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function POST(request: NextRequest) {
  try {
    // Get current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get photo URL from request
    const { profilePhotoUrl } = await request.json();
    
    if (!profilePhotoUrl) {
      return NextResponse.json({ error: 'Profile photo URL is required' }, { status: 400 });
    }
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { profilePhotoUrl },
    });
    
    return NextResponse.json({
      success: true,
      profilePhotoUrl: updatedUser.profilePhotoUrl,
    });
    
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return NextResponse.json({ 
      error: 'Failed to update profile photo',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}