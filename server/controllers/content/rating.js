import Content from "../../models/content.js";

export const voteContent = async (req, res) => {
  const { content, voteStatus, userId } = req;

  const voteType = req.body.type;

  try {
    if (voteStatus.flag) {
      if (content.rating[voteType + "s"].users.includes(userId)) {
        content.rating[voteType + "s"].count--;
        content.rating[voteType + "s"].users.pull(userId);
      } else {
        content.rating[voteType + "s"].count++;
        content.rating[voteType + "s"].users.push(userId);

        const previousVoteType = voteStatus.type;

        content.rating[previousVoteType + "s"].count--;
        content.rating[previousVoteType + "s"].users.pull(userId);
      }
    } else {
      content.rating[voteType + "s"].count++;
      content.rating[voteType + "s"].users.push(userId);
    }

    await content.save();

    const response = {
      message: `${voteType}d successfully`,
      upvotes: content.rating.upvotes.count,
      downvotes: content.rating.downvotes.count,
      voteStatus: {
        flag: content.rating[voteType + "s"].users.includes(userId),
        type: voteType,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    // console.log(error);
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

    let voteStatus;

    if (content.rating.upvotes.users.includes(userId)) {
      voteStatus = { type: "upvote", flag: true };
    } else if (content.rating.downvotes.users.includes(userId)) {
      voteStatus = { type: "downvote", flag: true };
    } else {
      voteStatus = { type: null, flag: false };
    }

    req.content = content;
    req.voteStatus = voteStatus;
    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
