// File: app/api/transactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

// POST route to store transaction details
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { transactionId, transactionAmount, isAnonymous } = await req.json();
    
    // Validate data
    if (!transactionId || !transactionAmount) {
      return NextResponse.json(
        { error: "Transaction ID and amount are required" },
        { status: 400 }
      );
    }

    // Get user email from session
    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Update user with transaction details
    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        transactionId,
        transactionAmount,
        transactionDate: new Date(),
        // If transaction is flagged as potentially anonymous, mark it in some way
        ...(isAnonymous && { mindbendPosition: "Anonymous Donor" }),
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Transaction recorded successfully" 
    });
  } catch (error) {
    console.error("Transaction recording error:", error);
    return NextResponse.json(
      { error: "Failed to record transaction" },
      { status: 500 }
    );
  }
}

// GET route to fetch transactions
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authorized (adjust as needed based on your requirements)
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    // Parse URL to get query parameters
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    
    // Get specific user's transaction or all transactions based on permissions
    // This is a basic implementation - adjust based on your authorization requirements
    if (userId) {
      const userTransaction = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          transactionId: true,
          transactionAmount: true,
          transactionDate: true,
        }
      });
      
      return NextResponse.json(userTransaction);
    } else {
      // Only return transactions (adjust fields as needed)
      const allTransactions = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          transactionId: true,
          transactionAmount: true,
          transactionDate: true,
          mindbendPosition: true
        }
      });
      
      return NextResponse.json(allTransactions);
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}