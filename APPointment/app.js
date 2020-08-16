const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/task');
const usersRouter = require('./routes/users');
const teamRouter = require('./routes/team');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use(auth.validate);
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use('/api/teams', teamRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({error:err.status});
});

module.exports = app;
