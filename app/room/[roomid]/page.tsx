"use client";

import useUser from "@/hooks/useUser";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const Room = ({ params }: { params: Promise<{ roomid: string }> }) => {
  const { fullName } = useUser();
  const [roomID, setRoomID] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setRoomID(resolvedParams.roomid);
    });
  }, [params]);

  let myMeeting: any = async (element: any) => {
    if (!roomID) return;

    // generate Kit Token
    const appID = 84984387;
    const serverSecret = 'cd42c06df656e6aef327fe8a53a568c2';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      uuid(),
      fullName || "user" + Date.now(),
      720
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Shareable link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      maxUsers: 10,
    });
  };

  return <div className="w-full h-screen" ref={myMeeting}></div>;
};

export default Room;