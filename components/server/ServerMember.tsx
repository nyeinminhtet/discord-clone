"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Crown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import UserAvator from "../UserAvator";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-auto text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <Crown className="h-4 w-4 ml-auto text-yellow-500" />,
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  return (
    <button
      className={cn(
        `group px-2 py-2 rounded-md flex items-center gap-x-2
        w-full hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition mb-1`,
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvator src={member.profile.imageUrl} className="h-8 w-8" />
      <p
        className={cn(
          `text-sm font-semibold text-zinc-500 group-hover:text-zinc-600
        dark:text-zinc-400 dark:group-hover:text-zinc-300 transition`,
          params.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
