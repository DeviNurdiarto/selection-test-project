const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "selection_test_mini_project",
  port: 3306,
});

db.connect((err) => {
  const queries = [
    {
      name: "createTableUsers",
      value: `CREATE TABLE IF NOT EXISTS Users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              username VARCHAR(255) UNIQUE NOT NULL,
              fullName VARCHAR(255) NOT NULL, 
              password VARCHAR(255) NOT NULL,
              is_verified BOOLEAN DEFAULT FALSE,
              verification_token VARCHAR(255),
              reset_password_token VARCHAR(255),
              bio TEXT,
              profile_pic varchar(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,
    },
    {
      name: "createTablePosts",
      value: `CREATE TABLE IF NOT EXISTS Posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                image VARCHAR(255) NOT NULL,
                caption TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id)
              )`,
    },
    {
      name: "createTableLikes",
      value: `CREATE TABLE IF NOT EXISTS Likes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                post_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (post_id) REFERENCES Posts(id)
              )`,
    },
    {
      name: "createTableComments",
      value: `CREATE TABLE IF NOT EXISTS Comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                post_id INT,
                comment_text TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (post_id) REFERENCES Posts(id)
              )`,
    },
  ];

  // Loop through the queries and execute them

  queries.forEach((query) => {
    db.query(query.value, function (err, result) {
      if (err) throw err;
      if (result.warningCount === 0) {
        console.log(`${query.name} table created`);
      } else {
        console.log(`${query.name} table already exists`);
      }
    });
  });

  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to mysql server");
});

const query = util.promisify(db.query).bind(db);

module.exports = { db, query };
