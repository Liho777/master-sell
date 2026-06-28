"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function login(prevState: unknown, formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Введите email и пароль" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Неверный email или пароль" };
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return { error: "Неверный email или пароль" };
  }

  await createSession(user.id);

  redirect("/dashboard");
}
