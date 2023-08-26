import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AddToWatchlist } from "../../watchlist";
import { Link } from "react-router-dom";
import Message from "../../../pages/Message/Message";
import { Rating } from "../../rating";

const TitleView = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState({});

  useEffect(() => {
    axiosPrivate
      .get(`/content/${id}`)
      .then((response) => {
        setItem(response.data.contentDetails);
        setUserVote(response.data.voteStatus);
      })
      .catch((error) =>
        setError("Something went wrong!. Please try again later")
      );
  }, [id, axiosPrivate]);

  if (!item) {
    return <Message message={error} />;
  }

  return (
    <header
      className="title-view-container"
      style={{
        backgroundImage: `url(${item.background_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        objectFit: "contain",
      }}
    >
      <div className="title-view-contents">
        <div className="title-category-ratings-wrapper">
          <p className="title-view-category">{item.category}</p>
          <p className="title-view-separator">|</p>
          <div className="title-view-ratings-container">
            <Rating
              upvotes={item.rating.upvotes.count}
              downvotes={item.rating.downvotes.count}
              contentId={item._id}
              userVote={userVote}
            />
          </div>
        </div>
        <h1 className="title-view-title">{item.title}</h1>
        <p className="title-view-synopsis">{item.synopsis}</p>
        <div className="title-view-buttons">
          <Link
            className="title-view-button"
            to="/video"
            state={{ contentArray: [item] }}
          >
            Play
          </Link>
          <AddToWatchlist classname="title-view-button" content={item} />
        </div>
        <p className="title-view-genre">{item.genres.join(" | ")}</p>
      </div>
    </header>
  );
};

export default TitleView;
