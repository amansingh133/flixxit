import React from "react";

const HistoryCard = ({ item }) => {
  return (
    <div className="history-card">
      <div className="history-image-container">
        <img src={item.background_path} alt={item.title} loading="lazy" />
      </div>
      <h2 className="history-title">{item.title}</h2>
    </div>
  );
};

export default HistoryCard;
