import React, { useEffect, useState } from "react";
import "../styles/TitleView.css";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AddToWatchlist } from "../../watchlist";

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
    return <div className="title-view-container loading">Loading...</div>;
  }

  return (
    <header
      className="title-view-container"
      style={{
        backgroundImage: `url(${item.background_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="title-view-contents">
        <p className="title-view-category">{item.category}</p>
        <h1 className="title-view-title">{item.title}</h1>
        <p className="title-view-synopsis">{item.synopsis}</p>
        <div className="title-view-buttons">
          <button className="title-view-button">Play</button>
          <AddToWatchlist classname="banner-button" content={item} />
        </div>
        <p className="title-view-genre">{item.genres.join(" | ")}</p>
      </div>
    </header>
  );
};

export default TitleView;
