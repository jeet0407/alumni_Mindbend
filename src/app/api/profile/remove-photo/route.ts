import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function POST() {
  try {
    // Get current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Update user in database to remove photo URL
    await prisma.user.update({
      where: { email: session.user.email },
      data: { profilePhotoUrl: null },
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error removing profile photo:', error);
    return NextResponse.json({ 
      error: 'Failed to remove profile photo',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}