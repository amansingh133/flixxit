import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const CustomVideoPlayer = ({ videoUrl720p, videoUrl1080p, skipDuration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("auto");
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.getDuration().then((dur) => setDuration(dur));
    }
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipIntro = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(skipDuration);
    }
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleResolutionChange = (event) => {
    setSelectedResolution(event.target.value);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleSeekChange = (value) => {
    if (playerRef.current) {
      playerRef.current.seekTo(value);
    }
  };

  const getCurrentResolutionUrl = () => {
    if (selectedResolution === "auto") {
      if (navigator.connection) {
        if (navigator.connection.downlink >= 4) {
          return videoUrl1080p;
        } else if (navigator.connection.downlink >= 2) {
          return videoUrl720p;
        }
      }
      return videoUrl1080p;
    }
    return selectedResolution === "720p" ? videoUrl720p : videoUrl1080p;
  };

  return (
    <div className="custom-video-player">
      <div className="video-container">
        <ReactPlayer
          ref={playerRef}
          url={getCurrentResolutionUrl()}
          playing={isPlaying}
          controls={false}
          width={isFullScreen ? "100%" : "640px"}
          height={isFullScreen ? "100%" : "360px"}
          onProgress={handleProgress}
        />
      </div>
      <div className="controls">
        <button onClick={handleSkipIntro}>SKIP Intro</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleToggleFullScreen}>
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
        <select value={selectedResolution} onChange={handleResolutionChange}>
          <option value="auto">Auto</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
        </select>
        <div className="progress-container">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
          />
          <div className="duration-info">
            {new Date(duration * played * 1000).toISOString().substr(11, 8)}
            {new Date(duration * 1000).toISOString().substr(11, 8)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
