$(function() {
    $('#submit-btn').on('click', function() {
        var url = $('#url-input').val();
        $.get('/loadUrl?url=' + url)
    });
    var socket = io.connect('http://localhost:2000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
});