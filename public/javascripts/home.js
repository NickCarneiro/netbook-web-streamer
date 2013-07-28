$(function() {
    var $message = $('#message');
    var $urlInput = $('#url-input');

    var submitUrl = function() {
        var url = $urlInput.val();
        if (!url) {
            showMessage('Enter a real URL.');
            return;
        }
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = 'http://' + url;
        }
        $.ajax('/loadUrl?url=' + url, {
            'method': 'get',
            'success': function() {
                var li = document.createElement('li');
                $(li).html('<a href="'+ url + '">' + url + '</a>');
                $('#history').prepend(li);
                $('#history a').on('click', function(e) {
                    var thisUrl = $(this).attr('href');
                    $urlInput.val(thisUrl);
                    e.preventDefault();
                });
                showMessage('Sent URL.');
                $urlInput.val('');

            },
            'error': function() {
                showMessage('Could not send URL');
            }
        });
    };

    $('#submit-btn').on('click', submitUrl);
    $urlInput.on('keypress', function(e) {
        if (e.keyCode === 13) {
            submitUrl();
        }
    });

    function showMessage(message) {
        $message.show();
        $message.text(message);
        $message.fadeOut(2000);
    }
});

