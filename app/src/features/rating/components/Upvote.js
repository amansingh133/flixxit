import React from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Vote.css";
import Tooltip from "../../../components/tooltip/Tooltip";
import { handleVotes } from "../utils/handle-votes";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Upvote = ({ contentId }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { upvote, userVote } = useSelector((state) => state.rating);

  const isVoted = userVote.flag && userVote.type === "upvote";

  return (
    <div className="votes-container">
      <button
        className="vote-button filled"
        onClick={() => handleVotes(axiosPrivate, contentId, dispatch, "upvote")}
      >
        {isVoted ? (
          <Tooltip tooltipText="Remove Vote">
            <FaThumbsUp size={35} color="#e50914" />
          </Tooltip>
        ) : (
          <Tooltip tooltipText="Upvote">
            <FaRegThumbsUp size={35} color="#e50914" />
          </Tooltip>
        )}
      </button>
      <p>{upvote}</p>
    </div>
  );
};

export default Upvote;
