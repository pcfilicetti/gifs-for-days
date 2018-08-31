var feelings = ['joy', 'excitement', 'sadness', 'devastation', 'anger', 'hunger', 'anxiety', 'delirium', 'fear', 'regret', 'remorse', 'grief', 'surprise', 'disgust', 'anticipation', 'uncertainty'];

function addFeelings() {
    $("#button-box").empty();
    for (var i = 0; i < feelings.length; i++) {
        var button = $("<button>").attr("class", "feeling").attr("data-feeling", feelings[i]).text(feelings[i]);
        $("#button-box").append(button);
    }
}

$('#button-box').on('click', '.feeling', function (event) {
    event.preventDefault();
    var feelingName = $(this).attr('data-feeling');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feelingName + "&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var results = response.data;
        $('#feelings-box').empty();
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div>').attr('class', 'gif-div');
            var gif = $('<img>').attr('class', 'gif').attr('src', results[i].images.fixed_height_still.url).attr('data-state', 'schleep').attr('data-live', results[i].images.fixed_height.url).attr('data-schleep', results[i].images.fixed_height_still.url);
            var gifRate = $('<h6>').attr('class', 'gif-rate').text('Gif Rating: ' + results[i].rating);
            gifDiv.append(gif, gifRate);
            $('#feelings-box').append(gifDiv);
        }
    });
});

$('#feelings-box').on('click', '.gif', function (event) {
    event.preventDefault();
    var state = $(this).attr('data-state');
    var live = $(this).attr('data-live');
    var schleep = $(this).attr('data-schleep');
    console.log('gif press');

    if (state == 'schleep') {
        $(this).attr('src', live);
        $(this).attr('data-state', 'live');
    } else {
        $(this).attr('src', schleep);
        $(this).attr('data-state', 'schleep');
    }
});

$('#feelings-stick').on('click', function (event) {
    event.preventDefault();
    feelings.push($('#feelings-corner').val());
    addFeelings();
});

addFeelings();