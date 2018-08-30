var feelings = ['joy', 'excitement', 'sadness', 'devastation', 'anger', 'hunger', 'anxiety', 'delirium'];

function addFeelings() {
    $("#button-box").empty();
    for (var i = 0; i < feelings.length; i++) {
        var button = $("<button>").attr("class", "feeling").attr("data-feeling", feelings[i]).text(feelings[i]);
        $("#button-box").append(button);
    }
    console.log('ran');
}

$('.feeling').on('click', function() {
    var feelingName = $(this).attr('data-feeling');
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + feelingName + "&api_key=dc6zaTOxFJmzC";
    console.log('button works' + feelingName);
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(data) {
        console.log(data);
    });
});

addFeelings();