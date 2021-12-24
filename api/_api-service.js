const Parser = require('rss-parser');
const striptags = require('striptags');

module.exports = {
  getReviews: async (feedUrl) => {
    try {
      const parser = new Parser();

      let feed = await parser.parseURL(feedUrl);

      const bookDetails = feed.items.map((review) => {
        return {
          book: {
            title: review.title,
            photoUrl: review.content.split('\n')[2],
            link: review.link
          },
          review: {
            body: striptags(review.content.split('\n')[11], [], '\n').split('review:')[1].trim(),
            date_read: review.pubDate
          }
        };
      });
      return bookDetails;
    } catch (error) {
      return {
        error: error.message
      };
    }
  }
};
