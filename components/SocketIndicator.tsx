"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { useSocket } from "@/components/providers/socket-provider";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        fallback
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Live
    </Badge>
  );
};

export default SocketIndicator;
