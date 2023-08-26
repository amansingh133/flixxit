import React from "react";
import { FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Vote.css";
import Tooltip from "../../../components/tooltip/Tooltip";
import { handleVotes } from "../utils/handle-votes";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Downvote = ({ contentId }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { downvote, userVote } = useSelector((state) => state.rating);

  const isVoted = userVote.flag && userVote.type === "downvote";

  return (
    <div className="votes-container">
      <button
        className="vote-button filled"
        onClick={() =>
          handleVotes(axiosPrivate, contentId, dispatch, "downvote")
        }
      >
        {isVoted ? (
          <Tooltip tooltipText="Remove Vote">
            <FaThumbsDown size={35} color="#e50914" />
          </Tooltip>
        ) : (
          <Tooltip tooltipText="Downvote">
            <FaRegThumbsDown size={35} color="#e50914" />
          </Tooltip>
        )}
      </button>
      <p>{downvote}</p>
    </div>
  );
};

export default Downvote;
