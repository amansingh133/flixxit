import React from "react";
import VideoPlayer from "./VideoPlayer";
import "../styles/Video.css";

const VideoPlayerWrapper = () => {
  return (
    <div className="app">
      <VideoPlayer
        url="https://drive.google.com/uc?id=1ssfqbJeqNgC-9DMcJP4bmYsSASV9dWlj"
        duration={10}
      />
    </div>
  );
};

export default VideoPlayerWrapper;
