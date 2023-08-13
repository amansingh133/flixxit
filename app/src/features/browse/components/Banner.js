import "../styles/banner.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeContent } from "../slices/content-slice";
import { callApi } from "../../../api/callApi";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import BannerItem from "./BannerItem";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Banner = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    callApi(axiosPrivate, "/content", "get")
      .then((res) => {
        dispatch(storeContent(res.data));
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = useSelector((state) => state.content);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CarouselProvider
          className="banner-container"
          naturalSlideWidth={100}
          naturalSlideHeight={50}
          totalSlides={content.length}
          visibleSlides={1}
          interval={5000}
          isPlaying={true}
          lockOnWindowScroll={true}
          dragEnabled={true}
          touchEnabled={true}
          infinite
          isIntrinsicHeight={true}
        >
          <Slider>
            {content.map((item, index) => (
              <Slide key={index} index={index}>
                <BannerItem item={item} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack className="back-button">
            <IoIosArrowBack size={48} className="banner-arrows" />
          </ButtonBack>
          <ButtonNext className="next-button">
            <IoIosArrowForward size={48} className="banner-arrows" />
          </ButtonNext>
        </CarouselProvider>
      )}
    </div>
  );
};

export default Banner;
