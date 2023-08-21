import React from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import screenfull from "screenfull";
import "../styles/FullScreen.css";

const FullScreen = ({ playerRef, onFullScreenChange }) => {
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerRef.current);
      screenfull.on("change", () =>
        onFullScreenChange(screenfull.isFullscreen)
      );
    }
  };

  return (
    <button className="fullScreen-button-wrapper" onClick={toggleFullScreen}>
      {screenfull.isFullscreen ? (
        <MdFullscreenExit size="3vw" color="white" />
      ) : (
        <MdFullscreen size="3vw" color="white" />
      )}
    </button>
  );
};

export default FullScreen;
