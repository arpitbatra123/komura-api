const convert = require('xml-js');
const got = require('got');
const striptags = require('striptags');

module.exports = {
  getReviews: async () => {
    try {
      const key = process.env.goodreads_key;
      const goodreadsResponseXML = await got(
        `https://www.goodreads.com/review/list/92378107.xml?key=${key}&v=2&shelf=read&sort=date_read`
      );

      goodreadsResponseJSON = convert.xml2json(goodreadsResponseXML.body, {
        compact: true
      });

      const reviews = JSON.parse(goodreadsResponseJSON).GoodreadsResponse.reviews.review;

      const bookDetails = reviews.map((review) => {
        return {
          book: {
            title: review.book.title._text,
            isbn: review.book.isbn13._text,
            link: review.book.link._text,
          },
          review: {
            body: striptags(review.body._cdata, '<br>'),
            url: review.url._text,
            rating: review.rating._text,
            date_read: review.read_at._text
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
