
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path');

var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);
var local = require('./local.js');
// all environments
app.set('port', process.env.PORT || local.httpPort);
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


server.listen(local.socketIoPort);

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
    var processedUrl = processUrl(req.query['url'])
    io.sockets.emit('audio', {url: processedUrl});
    res.set('Content-Type', 'application/javascript');
    res.send('');
};

routes.audio = function(req, res) {
    var socketIoUrl = 'http://' + local.appHostname + ':' + local.socketIoPort
    res.render('audio', {title: 'Play Audio', 'socketIoUrl': socketIoUrl});
};

app.get('/', routes.index);
app.get('/loadUrl', routes.loadUrl);
app.get('/audio', routes.audio);

var processUrl = function(url) {
    var processedUrl = url;
    // for youtube links, turn into an embed link and set autoplay=1
    if (url.indexOf('youtube.com') !== -1) {
        //input like: http://www.youtube.com/watch?v=b9N3tIlEJNc
        var video_id = url.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        processedUrl = 'http://www.youtube.com/embed/' + video_id + '?autoplay=1';
    }

    return processedUrl;

};