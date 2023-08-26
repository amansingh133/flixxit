import React from "react";
import { FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../styles/Vote.css";
import Tooltip from "../../../components/tooltip/Tooltip";

const Downvote = ({ contentId }) => {
  const { downvote, userVote } = useSelector((state) => state.rating);

  const isVoted = userVote.flag && userVote.type === "upvote";

  return (
    <div className="votes-container">
      <button className="vote-button filled">
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
