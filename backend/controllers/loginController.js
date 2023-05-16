const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const getUserQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const user = await query(getUserQuery, [usernameOrEmail, usernameOrEmail]);

    if (user.length === 0) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const { id, username, email, password: hashedPassword } = user[0];

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const generateAccessToken = (id, username) => {
      const secretKey = "sign";
      const token = jwt.sign({ id, username }, secretKey, { expiresIn: "1h" });
      return token;
    };

    const accessToken = generateAccessToken(id, username);

    return res.status(200).send({ accessToken });
  },
};
