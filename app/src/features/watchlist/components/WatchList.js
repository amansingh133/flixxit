import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setWatchlist } from "../slices/watchlist-slice";
import { useDispatch, useSelector } from "react-redux";
import RemoveFromWatchlist from "./RemoveFromWatchlist";
import MarkItemWatched from "./MarkItemWatched";
import { callApi } from "../../../api/callApi";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Tooltip from "../../../components/tooltip/Tooltip";
import Message from "../../../pages/Message/Message";

const WatchList = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userId = useSelector((state) => state.user.user.id);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    callApi(axiosPrivate, `/watchlist/${userId}`, "get")
      .then((res) => {
        dispatch(setWatchlist(res.data.items));
      })
      .catch((err) => console.error("Error fetching watchlist:", err))
      .finally(() => setIsLoading(false));
  }, [axiosPrivate, userId, dispatch]);

  const watchlistItems = useSelector((state) => state.watchlist);

  if (watchlistItems.length === 0) {
    return <Message message="Watchlist is Empty" />;
  }

  const contentArray = watchlistItems.map((item) => item.content);

  return (
    <>
      {isLoading ? (
        <Message message="Loading..." />
      ) : (
        <div className="watchlist-container">
          <header className="watchlist-header">
            <h1 className="watchlist-title">My Watchlist</h1>
            <Link
              className="play-all-container"
              to="/video"
              state={{ contentArray: contentArray }}
            >
              <p>Play All</p>
              <BsFillPlayFill
                className="play-all-button"
                color="#e50914"
                cursor="pointer"
                size="5vw"
              />
            </Link>
          </header>
          <ul>
            {watchlistItems.map((item) => (
              <li
                key={item.content._id}
                style={{
                  backgroundImage: `url(${item.content.background_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center bottom",
                }}
              >
                <Link
                  className="watchlist-item-title"
                  to={`/title/${item.content._id}`}
                >
                  {item.content.title}
                </Link>

                <div className="watchlist-buttons">
                  <Tooltip tooltipText="Play">
                    <Link to="/video" state={{ contentArray: [item.content] }}>
                      <BsFillPlayFill
                        color="#e50914"
                        cursor="pointer"
                        size="3.5vw"
                      />
                    </Link>
                  </Tooltip>

                  <MarkItemWatched
                    userId={userId}
                    contentId={item.content._id}
                    status={item.watched}
                  />

                  <RemoveFromWatchlist
                    userId={userId}
                    contentId={item.content._id}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default WatchList;
