const express = require('express');

const morgan = require('morgan');

const bagRouter = require('./routes/bagRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // middleware using app.use
app.use(express.static(`${__dirname}/public`)); // Serving static files
app.use((req, res, next) => {
  console.log('Hello from the middleware❤️');
  next(); // never forget to use next in middleware in case the application stuch on here~
});
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });
  next();
});

app.use('/api/v1/bags', bagRouter); // Middlerware function
app.use('/api/v1/users', userRouter);

module.exports = app;
