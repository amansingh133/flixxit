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
  }, [dispatch, upvotes, downvotes, userVote]);

  return (
    <div className="ratings-container">
      <Upvote contentId={contentId} userVote={userVote} />
      <Downvote contentId={contentId} userVote={userVote} />
    </div>
  );
};

export default Rating;
