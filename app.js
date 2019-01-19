var ingredientsArray = [];

$(document).ready(function () {

  //Function that takes the response from the AJAX request and separates it into the necessary elements in order to create a card for each recipe.
  function getRecipes(x) {
    //Clears any previous content where the Recipes will be displayed
    $("#recipeList").empty();
    $("#recipeList2").empty();
    var mealResults = x.hits;
    //Cycles through all the results to separate them into their own cards. 

    for (i = 0; i < mealResults.length; i++) {
      if (i ==0 || i ==5 ) {
      var rCol = $("<div>").addClass("col s2 offset-s1");
      } else {
        var rCol = $("<div>").addClass("col s2");
      }
      //Adds a link to the Full Recipe on the image of the result
      var rImg = $("<img>").attr("src", mealResults[i].recipe.image);
      var linkUrl = mealResults[i].recipe.url;
      var rLink = $("<a>").attr("href", linkUrl).attr("target", "_blank");
      (rLink).append(rImg);
      var imgDiv = $("<div>").addClass("card-image").append(rLink);
      var rTitle = $("<div>").addClass("card-title center pd10").text(mealResults[i].recipe.label)
      var rIng = mealResults[i].recipe.ingredientLines;
      var rlist = ingredientList(rIng);
      var rCard = $("<div>").addClass("card grey lighten 4 left")

      rCard.append(imgDiv, rTitle, rlist);
      rCol.append(rCard);
      if (i <= 4) {

        $("#recipeList").append(rCol);
      } else {
        $("#recipeList2").append(rCol);
      } 
    }
  };

  //Function that takes the input from the "Ingredients" form and separates them, trims them and returns a variable to be inserted into the Query URL
  function ingSearch(p) {
    var separateIngs = p.split(",");
    var ingURL = "";
    for (var x = 0; x < separateIngs.length; x++) {
      if (x === 0) {
        ingURL = ingURL + "q=" + separateIngs[x];
      } else {
        ingURL = ingURL + "&" + "q=" + separateIngs[x];
      }
    }
    return ingURL;

  }

  //Function that takes the input from the "Excluded" form and separates them, trims them and returns a variable to be inserted into the Query URL
  function exclSearch(q) {
    var separateExcl = q.split(",");
    var exclURL = "";
    for (var x = 0; x < separateExcl.length; x++) {
      if (x === 0) {
        exclURL = separateExcl[x];
      } else {
        exclURL = exclURL + "&" + "excluded=" + separateExcl[x];
      }
    }
    return exclURL;

  }

  //Creates the Ingredients List based on the input for each recipe
  function ingredientList(a) {

    //Creates a div where all the ingredients will go
    var recipeText = $("<div>").addClass("fHeight");

    //Runs through every ingredient in the array in order to separate them into their own line/paragraph
    for (var x = 0; x < a.length; x++) {
      var ingText = $("<p>").text(a[x]);
      $(recipeText).append(ingText);
    }
    return recipeText;
  }
  function getRestaurants() {

  };

  //Creates an event listener that waits for the user to click the "Submit" button in order to begin the recipe search
  $("#submit").on("click", function (event) {

    //Prevents the listener to continue with a blank search
    event.preventDefault();

    //Runs the Ingredient and Exclution functions in order to make sure the values are inputted correctly
    var ingredient = ingSearch($("#include").val().trim());
    var exclude = exclSearch($("#exclude").val().trim());
    var foodURL = "";

    //Creates a variable with the API Key and ID for the Edamam API
    var key = "app_key=3d809e0fa0e02efd9cc77818c1a35988";
    var id = "app_id=00bc6d9d";

    //Verifies if the "Excluded" field is empty or not. If it is then it just searches for ingredients. If it isn't empty then it adds the "excluded" ingredients to the search
    if (exclude != "") {
      foodURL = "https://api.edamam.com/search?" + id + "&" + key + "&" + ingredient + "&" + "excluded=" + exclude;
      console.log(foodURL);
    } else {
      foodURL = "https://api.edamam.com/search?" + id + "&" + key + "&" + ingredient;
    }

    //Sends the AJAX request to the API with the complete URL
    $.ajax({
      url: foodURL,
      method: "GET"
      //Waits for the response to arrive before calling the getRecipes function in order to display the results
    }).then(function (response) {

      getRecipes(response);

    })

    //Clears the "Include" and "Exclude" forms getting ready for the next search
    $("#include").val("");
    $("#exclude").val("");
  });

  $("#drinks-submit").on("click", function () {



  })

  $("#restaurant-submit").on("click", function () {



  })

})