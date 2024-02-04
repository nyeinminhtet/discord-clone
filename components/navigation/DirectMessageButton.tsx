import { cn } from "@/lib/utils";
import React from "react";

import { FaDiscord } from "react-icons/fa6";

const DirectMessageButton = () => {
  return (
    <button className="group flex items-center relative">
      <div
        className={cn(
          "absolute left-0 bg-primary rounded-r-full transition-all w-[4px] group-hover:h-[20px]"
          // params?.serverId !== id && "group-hover:h-[20px]",
          // params?.serverId === id ? "h-[36px]" : "h-[8px]"
        )}
      />
      <div
        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center
         justify-center bg-neutral-500 dark:bg-neutral-700 group-hover:bg-indigo-500"
      >
        <FaDiscord
          className="h-8 w-8 text-zinc-200
                    group-hover:text-white"
        />
      </div>
    </button>
  );
};

export default DirectMessageButton;
