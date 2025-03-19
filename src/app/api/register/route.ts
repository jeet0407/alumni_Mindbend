import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Received registration request:', body);

        const {
            firstName, lastName, email, password, phone, admissionNumber, graduationYear,
            currentJobTitle, currentCompany, currentLocation, linkedinUrl, bio, mindbendPosition
        } = body;

        // Required fields validation
        const requiredFields = [firstName, lastName, email, password, phone, admissionNumber, 
            graduationYear, currentJobTitle, currentCompany, currentLocation, linkedinUrl, mindbendPosition];
        
        if (requiredFields.some(field => !field)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate phone number format (10-digit number)
        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
        }

        // Validate mindbendPosition
        const validPositions = ["CCAS", "JCCAS", "Chief Advisor", "Convener", "Cheif Advisor", "Manager", "Head", "Co-Head", "Coordinator"];
        if (!validPositions.includes(mindbendPosition)) {
            return NextResponse.json({ error: 'Invalid Mindbend Position' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                firstName, lastName, email, password: hashedPassword, phone, admissionNumber,
                graduationYear, currentJobTitle, currentCompany, currentLocation, linkedinUrl,
                bio, mindbendPosition,
                transactionId: '', // Add a default value or get it from the request body
                transactionAmount: 0 // Add a default value or get it from the request body
            },
        });

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ 
            error: 'Error creating user', 
            details: error instanceof Error ? error.message : JSON.stringify(error) 
        }, { status: 500 });
    }
}