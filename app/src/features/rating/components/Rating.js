import React, { useEffect } from "react";
import Upvote from "./Upvote";
import Downvote from "./Downvote";
import { updateVotes } from "../utils/update-votes";
import { useDispatch } from "react-redux";
import "../styles/Rating.css";

const Rating = ({ upvotes, downvotes, contentId, userVote }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateVotes(dispatch, upvotes, downvotes, userVote);
  }, [dispatch, downvotes, upvotes, userVote]);

  return (
    <div className="ratings-container">
      <Upvote contentId={contentId} />
      <Downvote contentId={contentId} />
    </div>
  );
};

export default Rating;
