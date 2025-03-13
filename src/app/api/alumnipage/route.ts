import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch alumni grouped by graduationYear between 2014 and 2024
        const alumni = await prisma.user.findMany({
            where: {
                graduationYear: {
                    gte: 2014, // Greater than or equal to 2014
                    lte: 2024  // Less than or equal to 2024
                },
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                admissionNumber: true,
                phone: true,
                linkedinUrl: true,
                instagramUrl: true,
                twitterUrl: true,
                githubUrl: true,
                websiteUrl: true,
                bio: true,
                currentJobTitle: true,
                currentCompany: true,
                currentLocation: true,
                graduationYear: true,
                profilePhotoUrl: true,
            },
            orderBy: {
                firstName: 'asc' // Sort alphabetically within each year
            }
        });

        // Group alumni by graduation year
        interface AlumniType {
            id: string;
            firstName: string | null;
            lastName: string | null;
            admissionNumber: string | null;
            phone: string | null;
            linkedinUrl: string | null;
            instagramUrl: string | null;
            twitterUrl: string | null;
            githubUrl: string | null;
            websiteUrl: string | null;
            bio: string | null;
            currentJobTitle: string | null;
            currentCompany: string | null;
            currentLocation: string | null;
            graduationYear: number;
            profilePhotoUrl: string | null;
        }

        const groupedAlumni = alumni.reduce((acc, alum) => {
            const year = alum.graduationYear.toString();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(alum);
            return acc;
        }, {} as Record<string, AlumniType[]>);

        return NextResponse.json({ alumni: groupedAlumni }, { status: 200 });
    } catch (error) {
        console.error('Error fetching alumni:', error);
        return NextResponse.json({ 
            error: 'Error fetching alumni', 
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}