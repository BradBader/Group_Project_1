var ingredientsArray = [];

$(document).ready(function(){

function getRecipes(x)
{
  $("#recipeList").empty();
  var mealResults = x.hits;

  for(i=0;i<mealResults.length;i++)
  {
    
    // var rImg = $("<img>").addClass("edamam").attr("src",mealResults[i].recipe.image);
    // var imgDiv = $("<div>").addClass("card-image").append(rImg);
    // var rTitle = $("<span>").addClass("card-title").text(mealResults[i].recipe.label)
    // var rIng = mealResults[i].recipe.ingredientLines;
    // var rlist = ingredientList(rIng);
    // var rCard = $("<div>").addClass("card grey blue lighten-5")

    // rCard.append(imgDiv, rTitle, rlist);
    // $("#recipeList").append(rCard);
    var rCol = $("<div>").addClass("col s2");
    var rImg = $("<img>").attr("src",mealResults[i].recipe.image);
    var imgDiv = $("<div>").addClass("card-image").append(rImg);
    var rTitle = $("<span>").addClass("card-title center pd10").text(mealResults[i].recipe.label)
    var rIng = mealResults[i].recipe.ingredientLines;
    var rlist = ingredientList(rIng);
    var rContent = $("<div>").addClass("card-content white-text");
    var rCard = $("<div>").addClass("card grey lighten 4 left")
 
    rCard.append(imgDiv, rTitle, rlist);
    rCol.append(rCard);
    $("#recipeList").append(rCol);

  }


};

function ingSearch(p)
{
  var separateIngs = p.split(",");
  var ingURL = "";
  for (var x=0; x<separateIngs.length; x++)
  {
    if(x === 0)
    {
    ingURL = ingURL + "q=" + separateIngs[x];
    } else
      {
        ingURL = ingURL + "&" +"q=" + separateIngs[x];
      }
  }
  return ingURL;
  
}

function exclSearch(q)
{
  var separateExcl = q.split(",");
  var exclURL = "";
  for (var x=0; x<separateExcl.length; x++)
  {
    if(x === 0)
    {
    exclURL = separateExcl[x];
    } else
      {
        exclURL = exclURL + "&" +"excluded=" + separateExcl[x];
      }
  }
  return exclURL;
  
}
function ingredientList(a)
{
 var recipeText = $("<div>").addClass("fHeight");

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

// var ingredient = "q=" + $("#include").val().trim();
var ingredient = ingSearch($("#include").val().trim());
// var exclude = $("#exclude").val().trim();
var exclude = exclSearch($("#exclude").val().trim());
var foodURL = "";
// https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
var key = "app_key=3d809e0fa0e02efd9cc77818c1a35988";
var id = "app_id=00bc6d9d";

if (exclude != "")
{
foodURL = "https://api.edamam.com/search?" + id + "&" + key + "&" + ingredient + "&" + "excluded=" + exclude;
console.log(foodURL);
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