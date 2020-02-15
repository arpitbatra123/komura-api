require('dotenv').config();
const {getReviews} = require('./api-service');

// Require the framework and instantiate it
const fastify = require('fastify')({logger: true});

// Declare a route
fastify.get('/', async (req, res) => {
  const reviewData = await getReviews();
  return res.send({
    data: reviewData,
  });
});


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
