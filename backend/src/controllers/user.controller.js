import User from "../models/User.js";

export const getRecommendations = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { $id: { $ne: currentUserId } }, //exclude current user
        { $id: { $nin: currentUser.friends } }, //exclude current user's friends
        { isOnBoarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getrecommendations controller: ", error);
    res.status(501).json({ message: "Internal server error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller: ", error);
    res.status(501).json({ message: "Internal server error" });
  }
};
