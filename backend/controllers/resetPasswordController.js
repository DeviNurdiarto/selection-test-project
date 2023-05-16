const { db, query } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
  reset: async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;

    try {
      const selectUserQuery = "SELECT username, password FROM users WHERE reset_password_token = ?";
      const [user] = await query(selectUserQuery, [token]);

      if (!user) {
        return res.status(400).send({ message: "Invalid verification token" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateUserQuery = "UPDATE users SET password = ? WHERE username = ?";
      await query(updateUserQuery, [hashedPassword, user.username]);

      res.status(200).send({ message: "Password reset successful" });
    } catch (err) {
      console.error("Error resetting password:", err);
      res.status(500).send({ message: "Failed to reset password. Please try again." });
    }
  },
};
