import React from "react";
import Player from "../components/Player";
import "../styles/Video.css";

const VideoPage = () => {
  const videoUrl1080p =
    "https://drive.google.com/uc?id=1ssfqbJeqNgC-9DMcJP4bmYsSASV9dWlj";

  return (
    <div className="video-player-page">
      <Player url={videoUrl1080p} />
    </div>
  );
};

export default VideoPage;
