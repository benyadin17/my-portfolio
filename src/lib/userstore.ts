// lib/userstore.ts
import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(name: string, email: string, password: string) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) return null;

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}
