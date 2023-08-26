import Content from "../../models/content.js";

export const getOneContent = async (req, res) => {
  const { id } = req.params;

  const { voteStatus } = req;

  try {
    const contentDetails = await Content.findById(id).select(
      "-rating.upvotes.users -rating.downvotes.users"
    );

    if (!contentDetails) {
      return res.status(404).json({ error: "Title not found" });
    }
    res.json(contentDetails, voteStatus);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContent = async (req, res) => {
  const userId = req.user._id;
  const content = await Content.find().select(
    "-rating.upvotes.users -rating.downvotes.users"
  );

  console.log(content);
  try {
    const contentWithVotes = content.map((item) => {
      let userVote = null;

      if (item.rating.upvotes.users.includes(userId)) {
        userVote = "upvote";
      } else if (item.rating.downvotes.users.includes(userId)) {
        userVote = "downvote";
      } else {
        userVote = null;
      }

      return {
        ...item,
        userVote: userVote,
      };
    });

    res.json(contentWithVotes);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getContentByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const content = await Content.find({ category: category })
      .limit(10)
      .select("-rating.upvotes.users -rating.downvotes.users");
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getContentByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
    const content = await Content.find({ genres: { $in: [genre] } })
      .limit(10)
      .select("-rating.upvotes.users -rating.downvotes.users");
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
