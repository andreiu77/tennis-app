import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { totp } from "otplib";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user?.twoFactorSecret) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ secret: user.twoFactorSecret, totp: totp.generate(user.twoFactorSecret) }, { status: 200 });
}
