import React from "react";
import "../styles/Result.css";

const Result = ({ result }) => {
  const img_base_url = "https://image.tmdb.org/t/p/original";

  return (
    <div className="search-result" key={result.id}>
      <div className="result-image">
        {result.poster_path || result.backdrop_path ? (
          <img
            src={`${img_base_url}${result.poster_path || result.backdrop_path}`}
            alt={
              result.title ||
              result.name ||
              result.original_title ||
              result.original_name
            }
            loading="lazy"
          />
        ) : (
          <p className="image-fallback-text">No Image Available</p>
        )}
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
