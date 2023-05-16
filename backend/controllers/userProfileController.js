const { db, query } = require("../database");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../frontend/src/image"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("image");


module.exports = {
  getUserProfile: async (req, res) => {
    const { usernameOrEmail } = req.query;
    try {
      const getUserProfileQuery = `
        SELECT * FROM users WHERE username = '${usernameOrEmail}' OR email = '${usernameOrEmail}'
      `;

      const user = await query(getUserProfileQuery);
      console.log(user)


      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const { id, email, fullName, bio, profile_pic, username } = user[0];

      const userProfile = {
        id,
        email,
        fullName,
        bio,
        profilePicture: profile_pic,
        username,
      };

      return res.status(200).json(userProfile);
    } catch (error) {
      console.error("Error retrieving user profile", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  newUserProfile: async (req, res) => {
    const { username, fullName, bio, localUsername } = req.body;
  
    const updateProfileQuery = `UPDATE users SET username = '${username}', fullName = '${fullName}', bio = '${bio}' WHERE username = '${localUsername}'`;
  
    try {
      await query(updateProfileQuery);
      return res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      console.error("Error updating user profile", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }  
};
