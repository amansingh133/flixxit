import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../../api/callApi";
import { useDispatch, useSelector } from "react-redux";
import { addContentToWatchlist } from "../slices/watchlist-slice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AddToWatchlist = ({ content, classname }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userId = useSelector((state) => state.user.user.id);
  const navigate = useNavigate();
  const [present, setPresent] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    callApi(axiosPrivate, `watchlist/${userId}/${content._id}`, "get")
      .then((res) => {
        setPresent(res.data.present);
      })
      .catch((error) => console.error("Error checking watchlist:", error));
  }, [axiosPrivate, content._id, userId]);

  const addToWatchList = async () => {
    try {
      const res = await callApi(
        axiosPrivate,
        `watchlist/${userId}/${content._id}`,
        "post"
      );

      if (res.status === 200) {
        setPresent(true);
        setClicked(true);
      }

      dispatch(addContentToWatchlist(content));
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <>
      {present ? (
        <button className={classname} onClick={() => navigate("/watchlist")}>
          Go to Watchlist
        </button>
      ) : (
        (!clicked || !present) && (
          <button className={classname} onClick={addToWatchList}>
            Add to Watchlist
          </button>
        )
      )}
    </>
  );
};

export default AddToWatchlist;
