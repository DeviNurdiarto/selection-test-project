const db = require('../database');

module.exports = {
  getUserPost: async (req, res) => {
    const { usernameOrEmail } = req.query;
    try {
      // Retrieve user_id based on the username or email
      const getUserIdQuery = `
        SELECT id
        FROM users
        WHERE username = ? OR email = ?
      `;
      const [user] = await db.query(getUserIdQuery, [usernameOrEmail, usernameOrEmail]);

      if (!user) {
        // User not found
        return res.status(404).json({ error: 'User not found' });
      }

      const userId = user.id;

      console.log(userId);

      // Retrieve active posts from the user_id
      const getPostQuery = `
        SELECT Posts.id, Posts.image AS media, Posts.created_at AS createdDate, COUNT(Likes.id) AS likes, Posts.caption
        FROM Posts
        LEFT JOIN Likes ON Posts.id = Likes.post_id
        WHERE Posts.is_active = 1 AND Posts.user_id = ${userId}
        GROUP BY Posts.id
      `;
      const [posts] = await db.query(getPostQuery);

      if (!Array.isArray(posts)) {
        // Handle case where no posts are found
        return res.status(404).json({ error: 'No posts found' });
      }

      const formattedPosts = posts.map((post) => ({
        username: usernameOrEmail,
        media: post.media,
        createdDate: post.createdDate,
        likes: post.likes,
        caption: post.caption,
      }));

      res.json(formattedPosts);
    } catch (error) {
      console.error('Error retrieving posts:', error);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },
};
