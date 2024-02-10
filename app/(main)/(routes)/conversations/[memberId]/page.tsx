import ChatHeader from "@/components/chat/ChatHeader";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface ConversationPageProps {
  params: {
    memberId: string;
  };
  searchParams: {
    serverId: string;
  };
}

const ConversationPage = async ({
  params: { memberId },
  searchParams: { serverId },
}: ConversationPageProps) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) return redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="flex bg-white dark:bg-[#313338] flex-col h-full">
      <ChatHeader
        serverId={serverId}
        name={otherMember.profile.name}
        type="conversation"
        image={otherMember.profile.imageUrl}
      />
    </div>
  );
};

export default ConversationPage;
