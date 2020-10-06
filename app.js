//external requires
const express = require('express');
const morgan = require('morgan');
const { ValidationError } = require("sequelize");
const path = require('path');


//internal requires
const { environment } = require("./config");
const usersRouter = require("./routes/users");


const app = express();

app.set('view engine', 'pug');

//external use statements
app.use(morgan('dev'));
app.use(express.json());


//internal use statements
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);


//TODO: error handlers
// unhandled requests
  app.use((req, res, next) => {
    const error = new Error("Resource could not be found.");
    error.errors = ["Resource could not be found."];
    error.status = 404;
    next(error);
  });

//sequelize errors
app.use((error, req, res, next) => {
  if(error instanceof ValidationError) {
    error.errors = error.errors.map((err) => err.message);
    error.title = "Sequelize Error";
  };
  next(error);
});

//general error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: error.title || "Server Error",
    errors: error.errors,
    stack: isProduction ? null : error.stack
  });
});

module.exports = app;
