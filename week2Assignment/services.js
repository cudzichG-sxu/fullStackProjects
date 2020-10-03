

function getRandomFoodPicture() {
    $(document).ready(function () {
        $("placeHolderImageOne").replaceWith("<img class='d-block w-100' src='http://lorempixel.com/400/400/food/' alt='First slide'>");
        $("placeHolderImageTwo").replaceWith("<img class='d-block w-100' src='http://lorempixel.com/400/400/sports/' alt='Second slide'>");
        $("placeHolderImageThree").replaceWith("<img class='d-block w-100' src='http://lorempixel.com/400/400/cats/' alt='Third slide'>");

    })
    $('.carousel').carousel({
        interval: 2000
    })
}



getRandomFoodPicture();