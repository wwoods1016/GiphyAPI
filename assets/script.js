$(document).ready(function () {

    // Array of buttons displayed on page before additional buttons are added
    var playerArray = ["LeBron James", "Kevin Durant", "Stephen Curry", "Giannis Antetokounmpo", "James Harden", "Trae Young"]

    // Function displays a button on the DOM for every item within the array of players
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

    // Function that will push a new item into the array when form is filled and button is clicked
    $("#add-player").on("click", function (event) {

        event.preventDefault();

        var baller = $("#player-input").val().trim();

        playerArray.push(baller);

        renderButtons();

    });

    // On click will pull images from the Gihpy API and put them onto the page to the limit of 8 items
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

                    // Adds a div with the class of picture
                    var ballerDiv = $("<div class='picture'>");

                    // Adds a <p> tag with the rating of gif
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Will add <img> tag and information for the src image and the still and animated objects from API
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

    // If clicked, animated unless already animated. In that case will make still.
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