import React, { useState } from "react";
import "../styles/Result.css";

const Result = ({ result }) => {
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="search-result" key={result.id}>
      <div className="result-image">
        {!imageLoaded && <p className="loading-message">Loading...</p>}
        <img
          src={`${img_base_url}${result.poster_path || result.backdrop_path}`}
          alt={
            result.title ||
            result.name ||
            result.original_title ||
            result.original_name
          }
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </div>
      <div className="result-details-container">
        <h2 className="result-title">
          {result.title ||
            result.name ||
            result.original_title ||
            result.original_name}
        </h2>
        <div className="result-details">
          <p>
            <span>Type: </span>
            <span className="type-capitalize">{result.media_type}</span>
          </p>
          <p>
            <span>Popularity % : </span>
            {result.popularity}
          </p>
          <p>
            {result.release_date
              ? `Release Date: ${result.release_date}`
              : `First Air Date: ${result.first_air_date}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
