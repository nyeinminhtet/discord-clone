"use client";

import React from "react";

import { Headphones, MicOff, Settings } from "lucide-react";

import { ActionTooltip } from "../ActionTooltip";
import { UserButton } from "@clerk/nextjs";

interface Props {
  profile: any;
}

const ServerBottomUserProfile = ({ profile }: Props) => {
  return (
    <div className="w-full h-14 bg-[#1E1F22]/60 p-4 pb-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center w-1/2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[32px] w-[32px]",
              },
            }}
          />
          <p className="flex flex-col">
            <span className="text-xs">{profile.name}</span>
            <span className="text-[10px] text-muted-foreground">Idle</span>
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <ActionTooltip label="Unmute">
            <MicOff className="h-5 w-5 text-red-500 cursor-pointer" />
          </ActionTooltip>

          <ActionTooltip label="Deafen">
            <Headphones className="h-5 w-5 cursor-pointer" />
          </ActionTooltip>

          <ActionTooltip label="User Settings">
            <Settings className="h-5 w-5 cursor-pointer" />
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};

export default ServerBottomUserProfile;
