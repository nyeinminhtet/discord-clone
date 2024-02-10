import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePage } from "@/lib/validation/current-profile-page";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allow" });
  }

  try {
    const profile = await currentProfilePage(req);
    const { conversationId, directMessageId } = req.query;
    const { content } = req.body;

    console.log(profile);

    if (!profile) return res.status(401).json({ message: "Unauthorized" });

    if (!conversationId)
      return res.status(400).json({ message: "ConversationId missing" });
    if (!directMessageId)
      return res.status(400).json({ message: "DirectMessageId missing" });

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          {
            memberTwo: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    console.log(conversation);

    if (!conversation)
      return res.status(404).json({ message: "Conversation not found" });

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) return res.status(404).json({ message: "Member not found" });

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!directMessage || directMessage.deleted)
      return res.status(404).json({ message: "No Message found" });

    const isMessageOwner = directMessage.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "DELETE") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner)
        return res.status(401).json({ message: "Unauthorized" });

      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const updatekey = `chat:${conversationId}:messages:update`;

    res?.socket?.server?.io.emit(updatekey, directMessage);

    return res.status(200).json(directMessage);
  } catch (error) {
    console.log("[Message_Id]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
