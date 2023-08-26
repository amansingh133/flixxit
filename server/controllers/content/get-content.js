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
    return res.status(200).json({ contentDetails, voteStatus });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContent = async (req, res) => {
  const userId = req.user._id;
  const content = await Content.find();
  try {
    const contentWithVotes = content.map((item) => {
      let voteStatus = {
        type: null,
        flag: false,
      };

      if (item.rating.upvotes.users.includes(userId)) {
        voteStatus.type = "upvote";
      } else if (item.rating.downvotes.users.includes(userId)) {
        voteStatus.type = "downvote";
      }

      const contentWithoutUsers = {
        ...item.toObject(),
        rating: {
          upvotes: {
            count: item.rating.upvotes.count,
          },
          downvotes: {
            count: item.rating.downvotes.count,
          },
        },
      };

      return {
        ...contentWithoutUsers,
        voteStatus,
      };
    });

    res.json(contentWithVotes);
  } catch (error) {
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
