import React, { useEffect, useState } from "react";
import "../styles/TitleView.css";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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
    <div className="title-view-container">
      <div className="title-image-container">
        <img
          src={item.background_path}
          alt={item.title}
          className="title-image"
        />
      </div>
      <div className="title-details">
        <h2>{item.title}</h2>
        <p>{item.synopsis}</p>
        <div className="rating">
          <p>
            Rating: {item.rating.upvotes} Upvotes, {item.rating.downvotes}{" "}
            Downvotes
          </p>
        </div>
        <p>Category: {item.category}</p>
        <p>Genres: {item.genres.join(", ")}</p>
      </div>
    </div>
  );
};

export default TitleView;
