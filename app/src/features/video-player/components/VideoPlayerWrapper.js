import React from "react";
import VideoPlayer from "./VideoPlayer";
import "../styles/Video.css";

const VideoPlayerWrapper = () => {
  const videoUrl720p =
    "https://drive.google.com/uc?id=1CWtFX5OiUOkztWROfL8r-PjqEvI9T1rb";
  const videoUrl1080p =
    "https://drive.google.com/uc?id=1ssfqbJeqNgC-9DMcJP4bmYsSASV9dWlj";
  const skipDuration = 30;

  return (
    <div className="app">
      <VideoPlayer
        videoUrl720p={videoUrl720p}
        videoUrl1080p={videoUrl1080p}
        skipDuration={skipDuration}
      />
    </div>
  );
};

export default VideoPlayerWrapper;
