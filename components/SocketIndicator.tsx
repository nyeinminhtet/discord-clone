"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { useSocket } from "@/components/providers/socket-provider";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div className="absolute bottom-0 right-0 bg-zinc-800 rounded-full w-3 h-3">
        <div className="bg-slate-500 text-white w-[10px] h-[10px] rounded-full border-none" />
      </div>
    );
  }
  return (
    <div className="absolute bottom-0 right-0 bg-zinc-800 rounded-full w-3 h-3">
      <div className="bg-emerald-600 text-white w-[10px] h-[10px] rounded-full border-none" />
    </div>
  );
};

export default SocketIndicator;
