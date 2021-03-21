require('dotenv').config();

module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
  twitterConfig: {
    language: process.env.TWITTER_LANG,
    retweet: process.env.TWITTER_RETWEET_RATE * 1000 * 60,
    searchCount: process.env.TWITTER_SEARCH_COUNT,
    resultType: process.env.TWITTER_RESULT_TYPE,
  },
};
