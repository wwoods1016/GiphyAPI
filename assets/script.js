$(document).ready(function () {


    var playerArray = ["LeBron James", "Kevin Durant", "Stephen Curry", "Giannis Antetokounmpo", "James Harden", "Trae Young"]


    function renderButtons() {


        $("#playerBtn").empty();


        for (var i = 0; i < playerArray.length; i++) {


            var a = $("<button>");

            a.addClass("nbaPlayers");

            a.attr("data-name", playerArray[i]);

            a.text(playerArray[i]);

            $("#playerBtn").append(a);
        }
    }

    $("#add-player").on("click", function (event) {

        event.preventDefault();

        var baller = $("#player-input").val().trim();

        playerArray.push(baller);

        renderButtons();

    });

    $(document).on("click", ".nbaPlayers", function () {

        var baller = $(this).attr("data-name");


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            baller + "&api_key=TCXcbMxbOFU6qpJQnzWmEAKfnS5PxpSS&limit=8";


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {

                var results = response.data;

                $("#newGif").empty();

                for (var i = 0; i < results.length; i++) {


                    var ballerDiv = $("<div class='picture'>");


                    var p = $("<p>").text("Rating: " + results[i].rating);


                    var playerImage = $("<img>");

                    playerImage.attr("src", results[i].images.fixed_height_still.url);

                    playerImage.attr("data-still", results[i].images.fixed_height_still.url);

                    playerImage.attr("data-animate", results[i].images.fixed_height.url);

                    playerImage.attr("data-state", "still");


                    ballerDiv.append(p);
                    ballerDiv.append(playerImage);


                    $("#newGif").prepend(ballerDiv);
                }
            });
    });

    $(document).on("click", "img", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });




    renderButtons();

});