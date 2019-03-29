$(document).ready(function() {

    var cartoons = ["Sponge Bob", "Patrick", "Mr. Krabs", "Mickey Mouse", "Donald Duck", "Porky Pig", "Snow White", "Sleeping Beauty", "Daisy Duck", "Daffy Duck", "Winnie-the-Pooh", "Sylvester", "Yogi Bear", "Pink Panther"];

    renderButtons();

    // Function to display buttons on page - at beginning, and also after another button is added
    function renderButtons() {
        for (var i=0; i<cartoons.length; i++) {
            var btn = cartoons[i];
            console.log("btn = " + btn);


        /*
            var btn = $("<button>").addClass("buttons").attr("data-name", cartoons[i]).text(cartoons[i]);
            var delBtn = $("<button>").addClass("deleteButton");
            
        */
            
            if (btn != "" || " ") {
                $("ul").append("<li class='buttons'><span><i class='far fa-trash-alt'></i></span> " + btn);
        /*       btn.append(delBtn);   */
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

    // click delete character button    
    $("ul").on("click", "span", function(e) {
        console.log("before: " + cartoons);
        $(this).parent().fadeOut(500, function() {
            $(this).remove;
            cartoons.pop($(this));
            console.log("after: " + cartoons);
        });
        e.stopPropagation();
    });

    // click Cartoon Character Button
    $("ul").on("click", "li", function() {
        var CChar = $(this).text();
        console.log();
        console.log("You clicked on li: " + CChar);
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
            $("#gifContainer").empty();
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
                $("#gifContainer").append(charDiv);
                // console.log("imgID = " + imgID);
            }
        });
    });

    // click cartoon character gif
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
