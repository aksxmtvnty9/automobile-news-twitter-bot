const Twit = require('twit');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const getTweets = require('./getTweets');

const T = new Twit(config.twitterKeys);

const init = () => {
  /**
   * Take the local json file and keep it in the retweet
   * array to check if we have already tweeted the tweet
   */
  const tweetDoneFile = fs.readFileSync(path.join(__dirname, 'tweetDone.json'));
  let retweetArray = JSON.parse(tweetDoneFile);

  // Get the recent Tweets
  getTweets()
    .then((recentTweets) => {
      console.log(recentTweets);
      if (recentTweets.length > 0) {
        for (const tweet of recentTweets) {
          let reTweetId = tweet.id_str;
          if (tweet.retweeted_status) {
            reTweetId = tweet.retweeted_status.id_str;
          }

          const isDuplicated = retweetArray.filter(
            (item) => item.id === reTweetId
          );

          if (isDuplicated.length <= 0) {
            retweetArray.push({
              id: reTweetId,
              timestamp: new Date(),
            });
            postTweets(reTweetId);
          }
        }
      }
    })
    .catch((err) => console.log(err));

  // Write back to the json file for future references
  fs.writeFile(
    path.join(__dirname, 'tweetDone.json'),
    JSON.stringify(retweetArray),
    function (err) {
      console.log(err);
    }
  );
};

/**
 * Retweets the tweet
 * @param {string} retweetId
 */
const postTweets = async (retweetId) => {
  try {
    const { response, err } = await T.post('statuses/retweet/:id', {
      id: retweetId,
    });
    if (response && !err) {
      console.log(`retweeted ${retweetId}`);
    }
    if (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = init;
