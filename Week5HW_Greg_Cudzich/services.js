
$(document).ready(function() {
    $('#formActual').submit(function(e) {
        e.preventDefault();
        const messageActual = $('#inputActual').val();
        $.post({
            url: 'messagePackage',
            data: JSON.stringify({"message": messageActual}),
            dataType: 'json',
            contentType: 'application/json'
        })
        $('#inputActual').replaceWith($('<input id="inputActual">').text(""));

    })
})
