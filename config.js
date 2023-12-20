require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  secret: process.env.SECRET,
  live: process.env.LIVE,
};
