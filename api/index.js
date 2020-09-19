require('dotenv').config();
const { getReviews } = require('./_api-service');

module.exports = async (req, res) => {
  const reviewData = await getReviews();
  return res.json({
    data: reviewData
  });
};
