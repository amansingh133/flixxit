import Content from "../../models/content.js";

export const upvoteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    content.rating.upvotes++;
    await content.save();

    res.json(content.rating);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const downvoteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    content.rating.downvotes++;
    await content.save();

    res.json(content.rating);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
