import Content from "../../models/content.js";

export const voteContent = async (req, res) => {
  const { content, voteStatus, userId } = req;

  try {
    if (voteStatus.flag) {
      if (voteStatus.type === req.body.type) {
        content.rating[voteStatus.type + "s"].count--;
        await content.rating[voteStatus.type + "s"].users.pull(userId);
      } else {
        content.rating[voteStatus.type + "s"].count--;
        await content.rating[voteStatus.type + "s"].users.pull(userId);
        content.rating[voteStatus.type + "s"].count++;
        await content.rating[voteStatus.type + "s"].users.push(userId);
      }
    } else {
      content.rating[voteStatus.type + "s"].count++;
      content.rating[voteStatus.type + "s"].users.push(userId);
    }

    await content.save();

    return res.status(200).json({
      message: `${req.body.type}d successfully`,
      upvotes: content.rating.upvotes.count,
      downvotes: content.rating.downvotes.count,
      voteStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkUserVote = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const hasUpvoted = content.rating.upvotes.users.includes(userId);
    const hasDownvoted = content.rating.downvotes.users.includes(userId);

    if (hasUpvoted) {
      req.voteStatus = { type: "upvote", flag: true };
    } else if (hasDownvoted) {
      req.voteStatus = { type: "downvote", flag: true };
    } else {
      req.voteStatus = { type: null, flag: false };
    }

    req.content = content;
    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
