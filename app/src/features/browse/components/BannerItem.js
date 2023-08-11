import React from "react";
import { useNavigate } from "react-router-dom";

const BannerItem = ({ item }) => {
  const navigate = useNavigate();

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const handleTitleClick = (item) => {
    navigate(`/title/${item._id}`);
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
        <h1 className="banner-title" onClick={() => handleTitleClick(item)}>
          {item.title}
        </h1>
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
