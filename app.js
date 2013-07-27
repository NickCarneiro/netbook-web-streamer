
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


server.listen(2000);

io.sockets.on('connection', function (socket) {
    console.log('got a connection');
});

var routes = {};
/*
 * GET home page.
 */
routes.index = function(req, res) {
    res.render('index', { title: 'Netbook Web Stream' });
};

routes.loadUrl = function(req, res) {
    io.sockets.emit('audio', {url: req.query['url']});
    res.set('Content-Type', 'application/javascript');
    res.send('');
};

routes.audio = function(req, res) {
    res.render('audio', {title: 'Play Audio'});
};

app.get('/', routes.index);
app.get('/loadUrl', routes.loadUrl);
app.get('/audio', routes.audio);