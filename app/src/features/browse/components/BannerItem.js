import React from "react";
import { useNavigate } from "react-router-dom";
import { AddToWatchlist } from "../../watchlist";
import { Link } from "react-router-dom";
import { Rating } from "../../rating";

const BannerItem = ({ item }) => {
  const navigate = useNavigate();

  const handleTitleClick = (item) => {
    navigate(`/title/${item._id}`);
  };

  console.log(item);

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
            to="/video"
            state={{ contentArray: [item] }}
          >
            Play
          </Link>
          <AddToWatchlist classname="banner-button" content={item} />
        </div>
        <div className="banner-ratings">
          <Rating
            upvotes={item.rating.upvotes.count}
            downvotes={item.rating.downvotes.count}
            contentId={item._id}
            userVote={item.voteStatus}
          />
        </div>
      </div>
      <div className="banner--fadebottom" />
    </header>
  );
};

export default BannerItem;
