import React from "react";
import { useNavigate } from "react-router-dom";
import { AddToWatchlist } from "../../watchlist";
import { Link } from "react-router-dom";
import Message from "../../../pages/Message/Message";

const BannerItem = ({ item }) => {
  const navigate = useNavigate();

  const handleTitleClick = (item) => {
    navigate(`/title/${item._id}`);
  };

  const totalVotes = item.rating.upvotes.count + item.rating.downvotes.count;
  const upvotePercentage =
    totalVotes === 0
      ? 0
      : Math.round((item.rating.upvotes.count / totalVotes) * 100);

  if (!item) {
    return <Message message="Loading..." />;
  }

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
        <div className="upvote-percentage">
          {upvotePercentage === 0 ? (
            <p>Be the first to like this!</p>
          ) : (
            <p>
              {upvotePercentage}% <span>Upvotes</span>
            </p>
          )}
        </div>
      </div>
      <div className="banner--fadebottom" />
    </header>
  );
};

export default BannerItem;
