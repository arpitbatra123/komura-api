const { getReviews } = require('./_api-service');

module.exports = async (req, res) => {
  const feedUrl = `https://www.goodreads.com/review/list_rss/92378107?key=Lf3xAbVHzhiAXDaY6CdjRSWIHd0i1BE4nrIusRdj3O7Q16v8&shelf=read`;
  const reviewData = await getReviews(feedUrl);
  return res.json({
    data: reviewData
  });
};
