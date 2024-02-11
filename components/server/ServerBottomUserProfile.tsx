"use client";

import React from "react";

import { Headphones, MicOff, Settings } from "lucide-react";

import { ActionTooltip } from "../ActionTooltip";
import { UserButton } from "@clerk/nextjs";
import SocketIndicator from "../SocketIndicator";
import { useSocket } from "../providers/socket-provider";

interface Props {
  profile: any;
}

const ServerBottomUserProfile = ({ profile }: Props) => {
  const { isConnected } = useSocket();

  return (
    <div className="w-full h-14 bg-[#1E1F22]/60 p-4 pb-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center w-1/2">
          <div className="relative">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-[32px] w-[32px]",
                },
              }}
            />
            <SocketIndicator />
          </div>
          <p className="flex flex-col">
            <span className="text-xs">{profile.name}</span>
            <span className="text-[10px] text-muted-foreground">
              {isConnected ? "Online" : "Offline"}
            </span>
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
