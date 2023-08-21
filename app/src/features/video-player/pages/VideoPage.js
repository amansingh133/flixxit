import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import Player from "../components/Player";
import Navbar from "../../../components/navbar/Navbar";
import "../styles/VideoPage.css";

const VideoPage = () => {
  const location = useLocation();
  const content = location.state?.content;

  return (
    <div className="video-page-container">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Player
          url1080={content.videoUrls.resolution_1080p}
          url720={content.videoUrls.resolution_720p}
          title={content.title}
        />
      </Suspense>
    </div>
  );
};

export default VideoPage;
