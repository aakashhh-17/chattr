import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.user.id);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller: ", error);
    res.status(501).json({ message: "Internal server error" });
  }
};
