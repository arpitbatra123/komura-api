require('dotenv').config();
const { getReviews } = require('./_api-service');

module.exports = async (req, res) => {
  const feedUrl = `https://www.goodreads.com/review/list_rss/68951276?shelf=read`;
  const reviewData = await getReviews(feedUrl);
  return res.json({
    data: reviewData
  });
};
