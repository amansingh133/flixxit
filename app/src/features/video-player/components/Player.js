import React, { useState, useRef } from "react";
import "../styles/Player.css";

import SkipIntro from "./SkipIntro";
import QualitySelector from "./QualitySelector";
import ErrorPage from "../../../pages/error/ErrorPage";
import FullScreen from "./FullScreen";

const Player = ({ url1080, url720 }) => {
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState("AUTO");
  const qualityOptions = ["AUTO", "1080P", "720P"];
  const [prevTime, setPrevTime] = useState(0);
  const [error, setError] = useState(null);
  const [networkStrength, setNetworkStrength] = useState("4g");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleSkipIntro = () => {
    playerRef.current.currentTime = 20;
  };

  const handleQualityChange = (newQuality) => {
    setPrevTime(playerRef.current.currentTime);
    setSelectedQuality(newQuality);
    playerRef.current.load();
    playerRef.current.play();
  };

  const getVideoUrl = () => {
    if (selectedQuality === "AUTO") {
      return networkStrength === "4g" ? url1080 : url720;
    } else if (selectedQuality === "1080P") {
      return url1080;
    } else if (selectedQuality === "720P") {
      return url720;
    }
  };

  const handleWaiting = () => {
    const networkType = navigator.connection.effectiveType;
    setNetworkStrength(networkType);
  };

  const handleFullScreenChange = (isActive) => {
    setIsFullScreen(isActive);
  };

  return (
    <div className="video-player" ref={playerDivRef}>
      {error ? (
        <ErrorPage errorMessage={error} />
      ) : (
        <>
          <video
            id={`${isFullScreen ? "myvideo" : ""}`}
            className="player"
            height="400px"
            ref={playerRef}
            autoPlay
            controls
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate foobar"
            onTimeUpdate={() => setCurrentTime(playerRef.current.currentTime)}
            onLoadedData={() => {
              playerRef.current.currentTime = prevTime;
              setPrevTime(0);
            }}
            onError={() =>
              setError("An error occurred while loading the video")
            }
            onWaiting={handleWaiting}
          >
            <source src={getVideoUrl()} type="video/mp4" />
          </video>

          <div className="player-controls">
            <SkipIntro
              currentTime={currentTime}
              onSkipIntro={handleSkipIntro}
            />
            <QualitySelector
              qualityOptions={qualityOptions}
              networkStrength={networkStrength}
              onSelectQuality={handleQualityChange}
            />
            <FullScreen
              playerRef={playerDivRef}
              onFullScreenChange={handleFullScreenChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
