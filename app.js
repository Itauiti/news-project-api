require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const { pathToBD } = require('./config');
const limiter = require('./rateLimiter/rateLimiter');
const allRouters = require('./routes/index');

const { PORT = 3000, NODE_ENV, MONGOOSE_SECRET } = process.env;

mongoose.connect(`${NODE_ENV === 'production' ? MONGOOSE_SECRET : pathToBD}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use('/', allRouters);
app.use(errorLogger);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log('работает');
});
