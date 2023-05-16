const { db, query } = require('../database');

module.exports = {
  like: async (req, res) => {
    const { image, usernameOrEmail } = req.body;

    try {
      const getUserQuery = 'SELECT id FROM users WHERE username = ? OR email = ?';
      const [userRow] = await query(getUserQuery, [usernameOrEmail, usernameOrEmail]);
      const userId = userRow?.id;

      const getPostIdQuery = `SELECT id FROM posts WHERE image = ?`;
      const [postRow] = await query(getPostIdQuery, [image]);
      const postId = postRow?.id;

      const checkLikeQuery = `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`;
      const [likeRow] = await query(checkLikeQuery, [userId, postId]);

      if (!likeRow) {
        const insertLikeQuery = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;
        await query(insertLikeQuery, [userId, postId]);

        console.log(postId);
        console.log(userId);

        return res.status(200).send({ message: `${usernameOrEmail} liked a post with id: ${postId}` });
      } else {
        return res.status(200).send({ message: `${usernameOrEmail} already liked this post` });
      }
    } catch (error) {
      console.error(error);
      console.log(image);
      console.log(usernameOrEmail);
      return res.status(500).send({ message: 'Like failed' });
    }
  },
};
