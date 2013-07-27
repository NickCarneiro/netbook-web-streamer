$(function() {
    var socketIoUrl = window['socketIoUrl'];
    var socket = io.connect(socketIoUrl);
    socket.on('audio', function (data) {
        console.log('loading ' + data.url);
        $('#audio-iframe').attr('src', data.url);
    });
    //css height doesn't seem to work for iframe.
    var $iframe = $('#audio-iframe')
    $iframe.height($(window).height());
    $iframe.width($(window).width());

    $('#url-submit-button').on('click', function() {
        $iframe.attr('src', $('#url-input').val());
    });

});