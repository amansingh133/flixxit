import "../styles/banner.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeContent } from "../slices/content-slice";
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
  const sliderRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/content");
        dispatch(storeContent(response.data));
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
          <Slider id="mySlider" ref={sliderRef} autoFocus>
            {content.map((item, index) => (
              <Slide key={index} index={index}>
                <BannerItem item={item} tabIndex={-1} />
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
