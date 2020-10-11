$(document).ready(function() {
    $('#formActual').submit(function(e) {
        e.preventDefault();
        const messageActual = $('#inputActual').val();
        $.post({
            url: '/listItemActual',
            data: JSON.stringify({"message": messageActual}),
            dataType: 'json',
            contentType: 'application/json'
        })
        $('#inputActual').replaceWith($('<input id="inputActual">').text(""));

        if(messageActual.length === 0) {
            console.log("empty input");
        } else {
            getLatestItem()
        }
    })
})

$(document).on('click', 'button.delete', function(event) {
    var id = event.target.id;

    $.ajax({
        url: "/?id=" + id,
        type: 'DELETE'
    })
    //getUpdateItems()
})

function getAllItems() {
    $.getJSON({
        url: '/list',
        success: function(data) {
            var list = [];
            $.each(data, function(i, item) {
                list.push("<li>" + item.listItem + "<button type='button' class='btn btn-danger btn-sm delete' id='"+item._id+"'>x</button></li>");
            })

            $("<ul>", {
                html: list.join("")
            }).appendTo($('#list'));
        }
    })
}
getAllItems();

function getLatestItem() {
    $.getJSON({
        url: '/list',
        success: function(data) {
            var list = [];
            var lastElement = data[data.length - 1];
            list.push("<li>" + lastElement.listItem + "<button type='button' class='btn btn-danger btn-sm delete' id='"+lastElement._id+"'>x</button></li></li>");
            $("<ul>", {
                html: list.join("").trim()
            }).appendTo($('#list'));
        }
    })
}

// function getUpdateItems() {
//     $.getJSON({
//         url: '/list',
//         success: function(data) {
//             var list = [];
//             $.each(data, function(i, item) {
//                 list.push("<li>" + item.listItem + "<button type='button' class='btn btn-danger btn-sm delete' id='"+item._id+"'>x</button></li>");
//             })
//
//             $("<ul>", {
//                 html: list.join("")
//             }).appendTo($('#list'));
//         }
//     })
// }