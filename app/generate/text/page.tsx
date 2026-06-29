import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import GenerateTextClientPage from "./GenerateTextClientPage";

export default async function GenerateTextPage() {
  const user = await getCurrentUser();

  let projects: { id: string; name: string }[] = [];
  if (user) {
    projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    });
  }

  return <GenerateTextClientPage projects={projects} />;
}
