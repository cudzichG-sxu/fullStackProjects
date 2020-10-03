const socket = io.connect('http://localhost:8001');

socket.on('user-message', message => {
    replaceBannerMessage(message);
});

$(document).ready(function() {
    $('#replace-button').click(function(e) {
        e.preventDefault();
        const messageRecieved = $('#message-input').val();
        socket.emit('sent-message', messageRecieved);
        $('#message-input').val('');

    })
})

function replaceBannerMessage(msg) {
    $('#message-container').replaceWith($('<div id="message-container" style="padding-left: 200px;">').append($('<p>').append($('<b>').text(msg))));
}