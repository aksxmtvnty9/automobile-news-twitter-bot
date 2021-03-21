const Twit = require('twit');
const config = require('../config');

const T = new Twit(config.twitterKeys);
const { searchCount, resultType, language } = config.twitterConfig;
const params = {
  q: 'from:KiaMotorsIN AND -is:reply',
  count: searchCount,
  result_type: resultType,
  lang: language,
};

/**
 * Gets the recent tweets from Twitter api
 * @returns {Array}
 */
const getTweets = async () => {
  console.log("getting tweets")
  try {
    const recentTweets = await T.get('search/tweets', params);
    if (recentTweets.err) {
      console.log(recentTweets.err);
      return [];
    }

    return recentTweets.data.statuses;
  } catch (error) {
    console.log(error);
  }

  return [];
};

module.exports = getTweets;
