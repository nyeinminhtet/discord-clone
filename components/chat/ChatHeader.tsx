import React from "react";

import { Hash } from "lucide-react";
import MobileToggle from "../Mobile-Toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  image?: string;
}

const ChatHeader = ({ serverId, name, type, image }: ChatHeaderProps) => {
  return (
    <div
      className="text-base font-semibold px-3 flex items-center h-12 border-neutral-200
  dark:border-neutral-800 border-b-2"
    >
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      <p className="font-semibold text-base text-black dark:text-white">
        {name}
      </p>
    </div>
  );
};

export default ChatHeader;
