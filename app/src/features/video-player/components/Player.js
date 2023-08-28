import React, { useState, useRef, useEffect } from "react";
import "../styles/Player.css";
import SkipIntro from "./SkipIntro";
import QualitySelector from "./QualitySelector";
import ErrorPage from "../../../pages/error/ErrorPage";
import FullScreen from "./FullScreen";
import AutoPlayButton from "./AutoPlayButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { handleLogging } from "../utils/handle-log";

const Player = ({ url1080, url720, title, onVideoEnd, id }) => {
  //Refs
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);
  const timeoutRef = useRef(null);

  //hooks
  const axiosPrivate = useAxiosPrivate();

  //States
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState("AUTO");
  const qualityOptions = ["AUTO", "1080P", "720P"];
  const [prevTime, setPrevTime] = useState(0);
  const [error, setError] = useState(null);
  const [networkStrength, setNetworkStrength] = useState("4g");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  //Functions
  const handleSkipIntro = () => {
    playerRef.current.currentTime = 20;
  };

  const handleAutoPlay = async (value) => {
    setAutoPlay(value);
  };

  const handleVideoEnd = async () => {
    await handleLogging(axiosPrivate, id);

    if (autoPlay && onVideoEnd) {
      onVideoEnd(playerRef);
    }
  };

  const handleQualityChange = async (newQuality) => {
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

  const setAutoType = () => {
    const networkType = navigator.connection.effectiveType;
    setNetworkStrength(networkType);
  };

  const handleFullScreenChange = (isActive) => {
    setIsFullScreen(isActive);
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2500);
  };

  const handleInteraction = () => {
    if (playerDivRef.current && playerRef.current && playerRef.current.paused) {
      setControlsVisible(true);
    } else {
      setControlsVisible(true);
      resetTimeout();
    }
  };

  const togglePlayPause = () => {
    if (playerDivRef.current && playerRef.current) {
      if (playerRef.current.paused) {
        playerRef.current.play();
      } else if (!playerRef.current.ended) {
        playerRef.current.pause();
      } else {
        playerRef.current.pause();
      }
    }
  };

  const handleRetry = async () => {
    if (retryCount < 10) {
      setRetryCount(retryCount + 1);
      setError(null);
      playerRef.current.load();
      playerRef.current.play();
    } else {
      setError("An error occurred while loading the video");
    }
  };

  //hooks
  useEffect(() => {
    resetTimeout();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  //// JSX Rendering
  return (
    <div
      className="video-player"
      ref={playerDivRef}
      onMouseMove={handleInteraction}
    >
      {error ? (
        <ErrorPage errorMessage={error} />
      ) : (
        <div
          className="player-wrapper"
          id={`${isFullScreen ? "myPlayerWrapper" : ""}`}
        >
          <video
            onClick={togglePlayPause}
            id={`${isFullScreen ? "myPlayer" : ""}`}
            className="player"
            ref={playerRef}
            controls
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate foobar"
            onWaiting={setAutoType}
            onLoadStart={() => setControlsVisible(false)}
            onTimeUpdate={() => setCurrentTime(playerRef.current.currentTime)}
            onLoadedData={() => {
              playerRef.current.currentTime = prevTime;
              setPrevTime(0);
              playerRef.current.play();
            }}
            onError={handleRetry}
            onEnded={handleVideoEnd}
            autoPlay={autoPlay}
          >
            <source src={getVideoUrl()} type="video/mp4" />
          </video>

          <div
            className={`player-controls ${controlsVisible ? "visible" : ""}`}
          >
            <h1 className="video-page-title">{title}</h1>{" "}
            <div className="custom-controls">
              <AutoPlayButton onAutoPlayChange={handleAutoPlay} />

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
          </div>
          <SkipIntro currentTime={currentTime} onSkipIntro={handleSkipIntro} />
        </div>
      )}
    </div>
  );
};

export default Player;
