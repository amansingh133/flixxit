import Content from "../../models/content.js";

export const getOneContent = async (req, res) => {
  const { id } = req.params;

  try {
    const contentDetails = await Content.findById(id);

    if (!contentDetails) {
      return res.status(404).json({ error: "Title not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.json(contentDetails);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();

    res.setHeader("Content-Type", "application/json");
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getContentByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const content = await Content.find({ category: category }).limit(10);
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getContentByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
    const content = await Content.find({ genres: { $in: [genre] } }).limit(10);
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
