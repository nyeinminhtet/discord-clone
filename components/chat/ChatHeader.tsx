import React from "react";

import { Hash, UserRoundPlus } from "lucide-react";
import MobileToggle from "../Mobile-Toggle";
import UserAvator from "../UserAvator";
import SocketIndicator from "../SocketIndicator";
import ChatButton from "./ChatButton";
import { ActionTooltip } from "../ActionTooltip";

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
      {type === "conversation" && (
        <UserAvator src={image} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-base text-black dark:text-white">
        {name}
      </p>
      <div className="ml-auto flex items-center ">
        <ChatButton />
        <ActionTooltip side="bottom" label="Add Friends to DM">
          {type === "conversation" && (
            <UserRoundPlus className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          )}
        </ActionTooltip>
      </div>
    </div>
  );
};

export default ChatHeader;
