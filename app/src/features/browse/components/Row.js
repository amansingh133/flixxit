import React, { useEffect, useState } from "react";
import "../styles/row.css";
import { tmdbAxios } from "../api/tmdb-content";

const Row = ({ title, fetchUrl }) => {
  const [contents, setContents] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdbAxios.get(fetchUrl);
      setContents(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {contents.map(
          (content) =>
            content.poster_path && (
              <img
                key={content.id}
                className="row-poster"
                src={`${base_url}${content.poster_path}`}
                alt={content.name}
                loading="lazy"
              />
            )
        )}
      </div>
    </div>
  );
};

export default Row;
