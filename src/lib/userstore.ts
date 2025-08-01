import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("findUserByEmail error:", error);
    return null;
  }
}

export async function createUser(name: string, email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error("createUser error:", error);
    return null;
  }
}
