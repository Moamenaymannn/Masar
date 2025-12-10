import { prisma } from "@/app/lib/prisma";

export async function checkUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}