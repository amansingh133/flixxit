import React from "react";
import { useNavigate } from "react-router-dom";
import { AddToWatchlist } from "../../watchlist";
import { Link } from "react-router-dom";

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
          <Link
            className="banner-button"
            to={`/video/${item._id}`}
            state={{ content: item }}
          >
            Play
          </Link>
          <AddToWatchlist classname="banner-button" content={item} />
        </div>
      </div>
      <div className="banner--fadebottom" />
    </header>
  );
};

export default BannerItem;
