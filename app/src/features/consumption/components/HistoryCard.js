import React from "react";
import "../styles/HistoryCard.css";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/title/${item._id}`);
  };

  return (
    <div className="history-card" onClick={handleClick}>
      <div className="history-image-container">
        <div className="history-image-container">
          <img
            className="history-image"
            src={item.background_path}
            alt={item.title}
            loading="lazy"
          />
        </div>
      </div>
      <h2 className="history-title">{item.title}</h2>
    </div>
  );
};

export default HistoryCard;
