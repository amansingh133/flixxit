import React from "react";
import ReactPlayer from "react-player";
import Controls from "./Controls";

const Player = ({ url }) => {
  return (
    <div className="video-container">
      <div className="custom-video-container">
        <div className="player-wrapper">
          <ReactPlayer
            className="player"
            url={url}
            width="100%"
            height="100%"
            playing={true}
            muted={true}
          />
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default Player;
