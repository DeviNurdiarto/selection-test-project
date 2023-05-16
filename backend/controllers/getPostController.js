const { db, query } = require('../database');

module.exports = {
  getPost: async (req, res) => {
    try {
      const postQuery = `
        SELECT Users.username, Posts.image AS media, Posts.created_at AS createdDate, COUNT(Likes.id) AS likes, Posts.caption
        FROM Posts
        JOIN Users ON Posts.user_id = Users.id
        LEFT JOIN Likes ON Posts.id = Likes.post_id
        WHERE Posts.is_active = 1
        GROUP BY Posts.id
      `;

      const posts = await query(postQuery);

      const formattedPosts = posts.map((post) => ({
        username: post.username,
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
