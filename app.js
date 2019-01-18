var ingredientsArray = [];

$(document).ready(function(){

function getRecipes(x)
{
  $("#recipeList").empty();
  var mealResults = x.hits;

  for(i=0;i<mealResults.length;i++)
  {
    
    var rImg = $("<img>").attr("src",mealResults[i].recipe.image);
    var imgDiv = $("<div>").addClass("card-image").append(rImg);
    var rTitle = $("<span>").addClass("card-title").text(mealResults[i].recipe.label)
    var rIng = mealResults[i].recipe.ingredientLines;
    var rlist = ingredientList(rIng);
    var rContent = $("<div>").addClass("card-content white-text");
    var rCard = $("<div>").addClass("card grey lighten 4")

    rCard.append(imgDiv, rTitle, rContent, rlist);
    $("#recipeList").append(rCard);

  }


};

function ingredientList(a)
{
 var recipeText = $("<div>");

  for(var x = 0; x<a.length; x++)
  {
    var ingText = $("<p>").text(a[x]);
    $(recipeText).append(ingText);
  }
  return recipeText;
}
function getRestaurants()
{

};

$("#submit").on("click", function(event){

event.preventDefault();

var ingredient = "q=" + $("#include").val().trim();
var exclude = $("#exclude").val().trim();
var foodURL = "";
// https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
var key = "app_key=3d809e0fa0e02efd9cc77818c1a35988";
var id = "app_id=00bc6d9d";

if (exclude != "")
{
foodURL = "https://api.edamam.com/search?" + id + "&" + key + "&" + ingredient + "&" + "excluded=" + exclude;
} else {
  foodURL =  "https://api.edamam.com/search?" + id + "&" + key + "&" + ingredient;
}

$.ajax({
    url: foodURL,
    method: "GET"
  }).then(function(response) {
    
    getRecipes(response);

  })


  $("#include").val("");
  $("#exclude").val("");
});

$("#drinks-submit").on("click", function(){


    
})

$("#restaurant-submit").on("click", function(){


    
})

})