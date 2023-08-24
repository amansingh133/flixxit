import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AddToWatchlist } from "../../watchlist";
import { Link } from "react-router-dom";
import Message from "../../../pages/Message/Message";

const TitleView = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axiosPrivate
      .get(`/content/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id, axiosPrivate]);

  if (!item) {
    return <Message message="Loading..." />;
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
        <p className="title-view-category">{item.category}</p>
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
