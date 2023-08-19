import React, { Suspense } from "react";
import Player from "../components/Player";

const VideoPage = () => {
  const videoUrl1080p =
    "https://drive.google.com/uc?id=1ssfqbJeqNgC-9DMcJP4bmYsSASV9dWlj";

  const videoUrl720p =
    "https://drive.google.com/uc?id=1CWtFX5OiUOkztWROfL8r-PjqEvI9T1rb";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Player url1080={videoUrl1080p} url720={videoUrl720p} />
    </Suspense>
  );
};

export default VideoPage;
