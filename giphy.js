$(document).ready(function() {

    var cartoons = ["Sponge Bob", "Patrick", "Mr. Krabs", "Mickey Mouse", "Donald Duck", "Porky Pig", "Red Riding Hood", "Snow White", "Sleeping Beauty", "Daisy Duck", "Popeye", "Olive Oyl", "Daffy Duck", "Winnie-the-Pooh", "Betty Boop", "Sylvester", "Yogi Bear", "Superman", "Elmer Fudd", "Tasmanian Devil", "Pink Panther"];

    renderButtons();

    // Function to display buttons on page - at beginning, and also after another button is added
    function renderButtons() {
        for (var i=0; i<cartoons.length; i++) {
            var btn = $("<button>").addClass("buttons").attr("data-name", cartoons[i]).text(cartoons[i]);
            if (btn.attr("data-name") != "") {
                $("#btnContainer").append(btn);
            }
        }
    }
   
    // Function run when Submit Button is clicked to add another Cartoon Character Button
    $(document).on("click", "#addCC", function(event) {
        event.preventDefault();
        var CChar = $("#CCInput").val().trim();
        

        if (CChar != "") {
            cartoons.push(CChar);
            $("#btnContainer").text("");
            renderButtons();
        }
        $("#CCInput").val("");
    });

    // function run when one of the Cartoon Character Buttons are clicked
    $(document).on("click", ".buttons", function() {
        var CChar = $(this).attr("data-name");
        console.log();
        console.log("You clicked on button: " + CChar);
        var APIKey = "r66mGJmgqWh5HquqoxbKJADBc0efxdKk"; 
        var queryURL = "https://api.giphy.com/v1/gifs/search" +
                     "?q=" + CChar + 
                     "&api_key=" + APIKey +
                     "&limit=10";
        console.log("queryURL = " + queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#leftCol").empty();
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                // console.log("Loop #1");
                var charDiv = $("<div id=charDiv>");  // you can use "$animalDiv" or "animalDiv" either one.
                var p = $("<p>");
                p.text(results[i].rating);
                var imgID = "charImage" + i;
                var charImage = $("<img>"); 
                charImage.attr("src", results[i].images.fixed_height_still.url);
                charImage.attr("id", imgID);
                charImage.attr("class", "gif");
                charImage.attr("data-state", "still");
                charImage.attr("data-still", results[i].images.fixed_height_still.url);
                charImage.attr("data-animate", results[i].images.fixed_height.url);
                charDiv.append(p);
                charDiv.append(charImage);
                $("#leftCol").append(charDiv);
                // console.log("imgID = " + imgID);
            }
        });
    });

    // function run when one of the cartoon character gifs are clicked
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        var id = $(this).attr("id");
        var index = id.substring(9);
        console.log("You clicked on id = " + id);
        console.log("index = " + index);


        console.log("Before state is " + state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log("Change to animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("Change to still");
            }


        source = $(this).attr("src");
        state = $(this).attr("data-state");

        console.log("Source is " + source);
        console.log("After state is " + state);
    });
});
