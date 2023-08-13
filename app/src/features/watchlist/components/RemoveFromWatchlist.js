import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { removeContentFromWatchlist } from "../slices/watchlist-slice";
import { useDispatch } from "react-redux";
import { callApi } from "../../../api/callApi";
import Tooltip from "../../../components/tooltip/Tooltip";
import { MdDeleteForever } from "react-icons/md";

const RemoveFromWatchlist = ({ userId, contentId }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const removeFromWatchlist = async (contentId) => {
    try {
      await callApi(
        axiosPrivate,
        `/watchlist/${userId}/${contentId}`,
        "delete"
      );
      dispatch(removeContentFromWatchlist(contentId));
    } catch (err) {
      console.error("Error marking content as watched:", err);
    }
  };

  return (
    <Tooltip tooltipText="Delete from watchlist">
      <MdDeleteForever
        onClick={() => removeFromWatchlist(contentId)}
        size="4.5vw"
        color="#e50914"
        cursor="pointer"
      />
    </Tooltip>
  );
};

export default RemoveFromWatchlist;
