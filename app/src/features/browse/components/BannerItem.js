import React from "react";

const BannerItem = ({ item }) => {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        objectFit: "contain",
        backgroundImage: `url(${item.background_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">{item.title}</h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">Add to Watchlist</button>
        </div>
        <h1 className="banner-description">
          {truncate(`${item.synopsis}`, 150)}
        </h1>
      </div>
      <div className="banner--fadebottom" />
    </header>
  );
};

export default BannerItem;
