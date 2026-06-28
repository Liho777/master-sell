"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function signup(prevState: unknown, formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!email || !password) {
    return { error: "Введите email и пароль" };
  }

  if (password !== confirm) {
    return { error: "Пароли не совпадают" };
  }

  if (password.length < 6) {
    return { error: "Пароль должен быть не короче 6 символов" };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "Пользователь с таким email уже существует" };
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      subscriptions: {
        create: {
          tier: "start",
          isActive: true,
        },
      },
    },
  });

  await createSession(user.id);

  return { success: "Аккаунт создан. Вы вошли автоматически." };
}
