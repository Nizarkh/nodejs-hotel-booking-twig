var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./database/mongodb.json');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dayRouter = require('./routes/day');
var roomRouter = require('./routes/rooms');
var hotelRouter = require('./routes/hotel');
var reservationRouter = require('./routes/reservation');
var authRouter = require('./routes/auth')
var signupRouter = require('./routes/signup')
var homeRouter = require('./routes/home')
var chatRouter = require('./routes/chat')

var mongoose =require('mongoose');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  allowEIO3: true // false by default
});;  
mongoose.connect(config.mongo.uri, ()=>console.log('Connected to DB'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'html');
//app.engine('html', twig.__express);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/views/chat.html');

});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/day', dayRouter);
app.use('/hotel', hotelRouter);
app.use('/reservation', reservationRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/home', homeRouter);
app.use('/chat', chatRouter);
app.use('/room', roomRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
///chat


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});
// Running the server
const PORT = 3000||3500;
http.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});