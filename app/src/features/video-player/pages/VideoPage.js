import React, { Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import Player from "../components/Player";
import Navbar from "../../../components/navbar/Navbar";
import "../styles/VideoPage.css";
import Message from "../../../pages/Message/Message";

const VideoPage = () => {
  const location = useLocation();
  const contentArray = location.state?.contentArray;
  const [contentIndex, setContentIndex] = useState(0);

  const playNextVideo = () => {
    if (
      contentArray &&
      contentArray.length > 1 &&
      contentIndex < contentArray.length - 1
    ) {
      setContentIndex(contentIndex + 1);
    }
  };

  return (
    <div className="video-page-container">
      <Navbar />
      <Suspense fallback={<Message message="Loading..." />}>
        <Player
          url1080={contentArray[contentIndex].videoUrls.resolution_1080p}
          url720={contentArray[contentIndex].videoUrls.resolution_720p}
          title={contentArray[contentIndex].title}
          onVideoEnd={playNextVideo}
          id={contentArray[contentIndex]._id}
        />
      </Suspense>
    </div>
  );
};

export default VideoPage;
