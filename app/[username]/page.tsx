import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: params.username.toLowerCase() },
    include: { profile: true },
  });

  if (!user || !user.profile) {
    notFound();
  }

  const profile = user.profile;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: profile.backgroundColor, color: profile.textColor }}
    >
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold" style={{ textShadow: `0 0 10px ${profile.accentColor}` }}>
          {profile.displayName || user.username}
        </h1>
        {profile.bio && <p className="mt-4 max-w-md text-lg">{profile.bio}</p>}
      </div>
    </div>
  );
}
