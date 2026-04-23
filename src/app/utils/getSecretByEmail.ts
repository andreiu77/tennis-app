import prisma from "@/lib/prisma";

export function getSecretByEmail(email: string){
    return prisma.user.findUnique({
        where: { email },
        select: { twoFactorSecret: true }
    }).then(user => {
        if (!user) {
            throw new Error("User not found");
        }
        return user.twoFactorSecret;
    }).catch(error => {
        console.error("Error fetching user secret:", error);
        throw new Error("Failed to fetch user secret");
    });
}