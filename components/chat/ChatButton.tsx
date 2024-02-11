"use client";

import React from "react";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Phone, PhoneOff, Video, VideoOff } from "lucide-react";

import { ActionTooltip } from "../ActionTooltip";

const ChatButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");
  const isAudio = searchParams?.get("audio");

  const VideoIcon = isVideo ? VideoOff : Video;
  const AudioIcon = isAudio ? PhoneOff : Phone;
  const videoTooltipLabel = isVideo ? "End Video Call" : "Start Video Call";
  const audioTooltipLabel = isAudio ? "End Voice call" : "Start Voice call";

  const onVideoClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  const onAudioClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          audio: isAudio ? undefined : true,
        },
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="flex justify-between">
      <ActionTooltip side="bottom" label={audioTooltipLabel}>
        <button
          onClick={onAudioClick}
          className="hover:opacity-75 transition mr-4 "
        >
          <AudioIcon
            className={`${
              isAudio ? "text-red-500" : "text-zinc-500 dark:text-zinc-400"
            } h-6 w-6`}
          />
        </button>
      </ActionTooltip>
      <ActionTooltip label={videoTooltipLabel}>
        <button
          onClick={onVideoClick}
          className="hover:opacity-75 transition mr-4 "
        >
          <VideoIcon
            className={`${
              isVideo ? "text-red-500" : "text-zinc-500 dark:text-zinc-400"
            } h-6 w-6`}
          />
        </button>
      </ActionTooltip>
    </div>
  );
};

export default ChatButton;
