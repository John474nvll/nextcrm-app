
import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET a single account by ID
export async function GET(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  try {
    const account = await prismadb.crm_Accounts.findUnique({
      where: {
        id: params.accountId,
      },
    });
    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.log("[ACCOUNT_GET]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}

// PATCH (update) an account
export async function PATCH(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  try {
    const body = await req.json();
    const updatedAccount = await prismadb.crm_Accounts.update({
      where: {
        id: params.accountId,
      },
      data: {
        ...body,
        updatedBy: session.user.id,
      },
    });
    return NextResponse.json(updatedAccount, { status: 200 });
  } catch (error) {
    console.log("[ACCOUNT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE an account
export async function DELETE(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  try {
    await prismadb.crm_Accounts.delete({
      where: {
        id: params.accountId,
      },
    });
    return new NextResponse("Account deleted", { status: 200 });
  } catch (error) {
    console.log("[ACCOUNT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
