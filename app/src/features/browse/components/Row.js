import React, { useEffect, useState, useCallback } from "react";
import "../styles/row.css";
import Message from "../../../pages/Message/Message";
import { getSuggestions } from "../utils/get-suggestions";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SuggestionsRow = memo(({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [visibleSlides, setVisibleSlides] = useState(6);

  const [isLoading, setIsLoading] = useState(true);

  const { suggestions, error } = useSelector((state) => state.suggestions);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1200) {
      setVisibleSlides(5);
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

  const handleClick = (suggestion) => {
    navigate(`/title/${suggestion._id}`);
  };

  useEffect(() => {
    getSuggestions(axiosPrivate, dispatch)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [axiosPrivate, dispatch, handleResize]);

  if (isLoading) {
    return <Message message="Loading..." />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="row">
      <h2>Suggestions</h2>
      <CarouselProvider
        className="row-posters"
        totalSlides={suggestions.length}
        visibleSlides={visibleSlides}
        dragEnabled={true}
        touchEnabled={true}
        isIntrinsicHeight={true}
      >
        <Slider className="row-wrapper">
          {suggestions.map(
            (suggestion, index) =>
              suggestion.background_path && (
                <Slide key={index} index={index}>
                  <div className="suggestions-container">
                    <div
                      className="suggestions-wrapper"
                      onClick={() => handleClick(suggestion)}
                    >
                      <div className="suggestions-image">
                        <img
                          key={suggestion._id}
                          className="row-poster"
                          src={suggestion.background_path}
                          alt={suggestion.title}
                          loading="lazy"
                        />
                      </div>
                      <p className="suggestions-title">{suggestion.title}</p>
                    </div>
                  </div>
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
});

export default SuggestionsRow;
