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
  upload: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      const { username, caption } = req.body;

      try {
        let userId;
        let queryField;

        // Check if the username is an email or username
        if (username.includes("@")) {
          // It's an email, query using email
          queryField = "email";
        } else {
          // It's a username, query using username
          queryField = "username";
        }

        // Get the user ID from the Users table based on the username or email
        const userQuery = `SELECT id FROM users WHERE ${queryField} = ?`;
        console.log("userQuery:", userQuery); // Log the query string
        const [userRows] = await query(userQuery, [username]);

        console.log("userRows:", userRows);

        if (!userRows) {
          return res.status(404).json({ error: "User not found" });
        }

        userId = userRows.id;

        // Access the uploaded file using req.file
        const image = req.file.filename;

        // Insert the post into the database
        const insertQuery =
          "INSERT INTO Posts (user_id, image, caption) VALUES (?, ?, ?)";
        await query(insertQuery, [userId, image, caption]);

        // Send a response indicating success
        res.status(200).json({ message: "Post created successfully" });
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
      }
    });
  },
};
