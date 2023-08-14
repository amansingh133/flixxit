import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setWatchlist } from "../slices/watchlist-slice";
import { useDispatch, useSelector } from "react-redux";
import RemoveFromWatchlist from "./RemoveFromWatchlist";
import MarkItemWatched from "./MarkItemWatched";
import { callApi } from "../../../api/callApi";
import { Link } from "react-router-dom";

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
    return <h1 className="empty-watchlist">Watchlist is empty</h1>;
  }

  return (
    <>
      {isLoading ? (
        <h1 className="empty-watchlist">Loading...</h1>
      ) : (
        <div className="watchlist-container">
          <h1>My Watchlist</h1>
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
