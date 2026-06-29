import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import GenerateImageClientPage from "./GenerateImageClientPage";

export default async function GenerateImagePage() {
  const user = await getCurrentUser();

  let projects: { id: string; name: string }[] = [];
  if (user) {
    projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    });
  }

  return <GenerateImageClientPage projects={projects} />;
}
