import { prisma } from "./prisma";

export const TIER_LABELS: Record<string, string> = {
  start: "Старт",
  pro: "Профи",
  agency: "Агентство",
};

export const DAILY_LIMITS: Record<string, { text: number; image: number }> = {
  start: { text: 3, image: 1 },
  pro: { text: 100, image: 50 },
  agency: { text: Infinity, image: Infinity },
};

export function startOfDay() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getUserTier(userId: string): Promise<string> {
  const subscription = await prisma.subscription.findFirst({
    where: { userId, isActive: true },
  });
  return subscription?.tier || "start";
}

export async function getUserLimits(userId: string) {
  const tier = await getUserTier(userId);
  const limits = DAILY_LIMITS[tier];
  if (!limits) {
    throw new Error(`Unknown subscription tier: ${tier}`);
  }

  const [textUsed, imageUsed] = await Promise.all([
    prisma.generation.count({
      where: {
        userId,
        type: "text",
        status: { not: "failed" },
        createdAt: { gte: startOfDay() },
      },
    }),
    prisma.generation.count({
      where: {
        userId,
        type: "image",
        status: { not: "failed" },
        createdAt: { gte: startOfDay() },
      },
    }),
  ]);

  return {
    tier,
    textLimit: limits.text,
    imageLimit: limits.image,
    textUsed,
    imageUsed,
    textRemaining: limits.text === Infinity ? Infinity : Math.max(0, limits.text - textUsed),
    imageRemaining: limits.image === Infinity ? Infinity : Math.max(0, limits.image - imageUsed),
  };
}

export async function checkTextLimit(userId: string) {
  const limits = await getUserLimits(userId);
  if (limits.textRemaining <= 0) {
    throw new Error(
      `Достигнут дневной лимит генераций текста (${limits.textLimit}). Обновите тариф.`,
    );
  }
  return limits;
}

export async function checkImageLimit(userId: string) {
  const limits = await getUserLimits(userId);
  if (limits.imageRemaining <= 0) {
    throw new Error(
      `Достигнут дневной лимит генераций изображений (${limits.imageLimit}). Обновите тариф.`,
    );
  }
  return limits;
}
