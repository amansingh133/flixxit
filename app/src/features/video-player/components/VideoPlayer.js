import React, { useState, useRef } from "react";

const VideoPlayer = ({ url, skipDuration }) => {
  const [videoQuality, setVideoQuality] = useState("auto");
  const videoRef = useRef(null);

  const handleQualityChange = (quality) => {
    setVideoQuality(quality);
  };

  const handleSkipIntro = () => {
    videoRef.current.currentTime = 30;
  };

  return (
    <div>
      <h1>Video Player</h1>
      <div>
        <video ref={videoRef} controls>
          <source src="https://drive.google.com/uc?id=1ssfqbJeqNgC-9DMcJP4bmYsSASV9dWlj" />
        </video>
      </div>
      <div>
        <button onClick={handleSkipIntro}>Skip Intro</button>
      </div>
      <div>
        <select
          value={videoQuality}
          onChange={(e) => handleQualityChange(e.target.value)}
        >
          <option value="auto">Auto</option>
          <option value="1080p">1080p (HD)</option>
          <option value="720p">720p</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
