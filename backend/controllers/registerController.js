const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { scrtk } = require("../confiq");


module.exports = {
  register: async (req, res) => {
    const { username, email, password, fullName } = req.body;

    let getUsernameQuery = `SELECT * FROM users WHERE username=${db.escape(
      username
    )}`;

    let isUsernameExist = await query(getUsernameQuery);

    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(
      email
    )}`;

    let isEmailExist = await query(getEmailQuery);

    if (isUsernameExist.length > 0) {
      return res.status(400).send({ message: "Username already taken" });
    }

    if (isEmailExist.length > 0) {
      return res.status(400).send({ message: "Email already taken" });
    }

    const generateVerificationToken = (username) => {
      const secretKey = scrtk;
      const token = jwt.sign({ username }, secretKey, { expiresIn: '9999 years' });
      return token;
    };

    const generateResetPasswordToken = (username) => {
      const secretKey = scrtk;
      const token = jwt.sign({ username }, secretKey, { expiresIn: '9999 years' });
      return token;
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const verificationToken = generateVerificationToken(username); // Generate verification token
    const resetPasswordToken = generateResetPasswordToken(username); // Generate reset password token

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aloysiuspurwadhika@gmail.com",
        pass: "dqowfzwvjafiefwq",
      },
    });

    const verificationLink = `http://localhost:3000/verification?token=${verificationToken}`;

    const mailOptions = {
      from: "aloysiuspurwadhika@gmail.com",
      to: email,
      subject: "Account Verification",
      text: `Please click the following link to verify your account: ${verificationLink}`,
      html: `<p>Please click the following link to verify your account:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ message: "Failed to send verification email" });
      } else {
        console.log("Email sent:", info.response);
        const sql =
          "INSERT INTO users (username, email, password, fullName, verification_token, reset_password_token) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
          username,
          email,
          hashPassword,
          fullName,
          verificationToken,
          resetPasswordToken,
        ];
    
        try {
          let addUserResult = await query(sql, values);
          return res.status(200).send({ data: addUserResult, message: "Register success" });
        } catch (error) {
          console.error("Error registering:", error);
          return res.status(500).send({ message: "Failed to register" });
        }
      }
    });    
  },
};
