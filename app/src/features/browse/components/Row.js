import React, { useEffect, useState, useCallback } from "react";
import "../styles/row.css";
import { tmdbAxios } from "../api/tmdb-content";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Row = ({ title, fetchUrl }) => {
  const [contents, setContents] = useState([]);
  const [visibleSlides, setVisibleSlides] = useState(6);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1200) {
      setVisibleSlides(6);
    } else if (window.innerWidth >= 992) {
      setVisibleSlides(5);
    } else if (window.innerWidth >= 768) {
      setVisibleSlides(4);
    } else if (window.innerWidth >= 576) {
      setVisibleSlides(3);
    } else if (window.innerWidth >= 400) {
      setVisibleSlides(2);
    } else {
      setVisibleSlides(1);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await tmdbAxios.get(fetchUrl);
        const first15Results = request.data.results.slice(0, 15);
        setContents(first15Results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fetchUrl, handleResize]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <CarouselProvider
        className="row-posters"
        totalSlides={contents.length}
        visibleSlides={visibleSlides}
        dragEnabled={true}
        touchEnabled={true}
        isIntrinsicHeight={true}
      >
        <Slider className="row-wrapper">
          {contents.map(
            (content, index) =>
              content.poster_path && (
                <Slide key={index} index={index}>
                  <img
                    key={content.id}
                    className="row-poster"
                    src={`${base_url}${content.poster_path}`}
                    alt={content.name}
                    loading="lazy"
                  />
                </Slide>
              )
          )}
        </Slider>
        <ButtonBack className="row-arrows left">
          <IoIosArrowBack size={60} />
        </ButtonBack>
        <ButtonNext className="row-arrows right">
          <IoIosArrowForward size={60} />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};

export default Row;
