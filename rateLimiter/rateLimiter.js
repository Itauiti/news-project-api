const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 25 * 60 * 1000,
  max: 120,
});

module.exports = limiter;
