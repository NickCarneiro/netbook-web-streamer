$(function() {
    var $message = $('#message');
    $('#submit-btn').on('click', function() {
        var url = $('#url-input').val();
        $.ajax('/loadUrl?url=' + url, {
            'method': 'get',
            'success': function(){
                $message.show();
                $message.text('URL sent.');
                $message.fadeOut(2000);
            },
            'error': function() {
                $message.show();
                $message.text('Could not send URL.');
                $message.fadeOut(2000);
            }
        });
    });
});