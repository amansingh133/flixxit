import React from "react";
import { useNavigate } from "react-router-dom";
import { AddToWatchlist } from "../../watchlist";

const BannerItem = ({ item }) => {
  const navigate = useNavigate();

  const handleTitleClick = (item) => {
    navigate(`/title/${item._id}`);
  };

  return (
    <header
      className="banner"
      style={{
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
          <AddToWatchlist classname="banner-button" content={item} />
        </div>
      </div>
      <div className="banner--fadebottom" />
    </header>
  );
};

export default BannerItem;
