import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { markContentAsWatched } from "../slices/watchlist-slice";
import { useDispatch } from "react-redux";
import { callApi } from "../../../api/callApi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Tooltip from "../../../components/tooltip/Tooltip";

const MarkItemWatched = ({ userId, contentId, status }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [currentStatus, setCurrentStatus] = useState(status);

  const markAsWatched = async (contentId) => {
    try {
      const res = await callApi(
        axiosPrivate,
        `/watchlist/${userId}/${contentId}/watched`,
        "patch"
      );
      dispatch(markContentAsWatched(res.data.status));
      setCurrentStatus(res.data.status);
      console.log(currentStatus);
    } catch (err) {
      console.error("Error removing content from watchlist:", err);
    }
  };

  return (
    <Tooltip
      tooltipText={currentStatus ? "Mark as unwatched" : "Mark as watched"}
    >
      {currentStatus ? (
        <FaBookmark
          onClick={() => markAsWatched(contentId)}
          size="3.5vw"
          color="#e50914"
          cursor="pointer"
        />
      ) : (
        <FaRegBookmark
          onClick={() => markAsWatched(contentId)}
          size="3.5vw"
          color="#e50914"
          cursor="pointer"
        />
      )}
    </Tooltip>
  );
};

export default MarkItemWatched;
