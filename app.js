$(document).ready(function(){
//call initialize fruits
//set interval 15000
initializeFruits();
timer = window.setInterval(updateFruit, 1000);
// console.log(fruitArray   );

});
var timer;
var timerCounter = 0;

var fruitArray = [];

function createListener(){
    $('.fruit').on('click', '.sell', sellFunction);
    $('.fruitapple').on('click', buyFunction);
    $('.fruitorange').on('click', buyFunction);
    $('.fruitbanana').on('click', buyFunction);
    $('.fruitgrape').on('click', buyFunction);
    $('.fruitpear').on('click', buyFunction);
    $('.fruitwatermelon').on('click', buyFunction);


}

var FruitObject = function(fruitType, price, totalSpent, totalBought, showCount, showAvg){
    this.fruitType = fruitType;
    this.price = price;
    this.totalSpent = totalSpent;
    this.totalBought = totalBought;
    this.showCount = showCount;
    this.showAvg = showAvg;
    fruitArray.push(this);
};

var userMoney = 10000;

function buyFunction (){
    // console.log("buy stuff");
    // console.log($(this).data());
    // console.log($(this).data("fruityMcType"));
    // $(this).data("fruityMcType");

    var currentPrice = $(this).data("fruityMcPrice");
    var totalCost = $(this).data("fruityMcSpent");
    var quantity = $(this).data("fruityMcBought");
    var fruitIndex = $(this).data("fruityIndex")


    if(userMoney > currentPrice){
        userMoney -= currentPrice;
        fruitArray[fruitIndex].totalBought++;
        fruitArray[fruitIndex].totalSpent+=currentPrice;



    } else {
        console.log("youre broke! and ugly!");
    };

    updateStats();
    //console.log(userMoney);
}

function updateStats(){
    console.log("in update stats");
    console.log("user money = "+ userMoney);
    var myFruit;
    var myAverage = 0;
    for (var i=0; i<fruitArray.length;i++){


        myFruit = fruitArray[i];
        myAverage = myFruit.totalSpent/myFruit.totalBought;

        if (isNaN(myAverage)){
            myAverage = 0;
        }
        myAverage = parseInt(myAverage)/100;
        myAverage = myAverage.toFixed(2);
        $(myFruit.showCount).text(myFruit.totalBought);
        $(myFruit.showAvg).text(myAverage);

    }
    $("#showCash").text(userMoney);

}

function sellFunction (){
    console.log("sell stuff");
}

function randomNumber(min, max){
  var randomPrice = Math.floor(Math.random() * (1 + max - min) + min);

  return randomPrice;
}

function priceChange(fruit){
    fruit.price += randomNumber(-50, 50);
    if (fruit.price < 50) {
        fruit.price = 50;
    }
    if (fruit.price > 999) {
        fruit.price = 999;
    }

};

function updateFruit(){//check for time limit
    timerCounter++;
    console.log(timerCounter);
    //loop through fruitArray
    //pass each fruit to pricechange function
    for(var i = 0; i<fruitArray.length; i++){
        //console.log(fruitArray[i]);
        priceChange(fruitArray[i]);
    }
    //dynamically display all info about fruits
    displayFruit();

    if(timerCounter == 20){
        gameOver();
    }
}

function displayFruit(){
    //call data from FruitObjects - put into html elements
    $('.fruit').remove();
    var $el = $('.fruit-bin');
    $el.append('<div class="fruit"></div>').fadeIn('fast');

    for(var i = 0; i<fruitArray.length; i++){
        var fruit = fruitArray[i];
        $el = $('.fruit-bin').children().last();
        $el.append('<div class="fruit' + fruit.fruitType + '"><p>' + fruit.fruitType +" "+  fruit.price+" "+ fruit.totalSpent+" "+fruit.totalBought+'</p><button class= "sell">Sell</button></div>');
        $el=$('.fruit').children().last();
        $el.data("fruityMcType", fruit.fruitType);
        $el.data("fruityMcPrice", fruit.price);
        $el.data("fruityMcSpent", fruit.totalSpent);
        $el.data("fruityMcBought", fruit.totalBought);
        $el.data("fruityIndex", i);
        // $el.append('<p>' + fruit.fruitType + '</p>');
        // $el.append('<p>' + fruit.price + '</p>');
        // $el.append('<p>' + fruit.totalSpent + '</p>');
        // $el.append('<p>' + fruit.totalBought + '</p>');
        // $el.append('<button class= "sell">Sell</button>');
    }
    createListener();
}

function gameOver(){
  window.clearInterval(timer);
  console.log("all done");
    //clearInterval
    //sell everything
    //display stats
    //subit button {no code easy peasy}

}

function initializeFruits(){
var apples = new FruitObject("apple", randomNumber(1, 999), 0, 0,"#countApple","#avgApple");
var oranges = new FruitObject("orange", randomNumber(1, 999), 0, 0,"#countOrange","#avgOrange");
var bananas = new FruitObject("banana", randomNumber(1, 999), 0, 0,"#countBanana","#avgBanana");
//var grapes = new FruitObject("grape", randomNumber(1, 999), 0, 0);
var pears = new FruitObject("pear", randomNumber(1, 999), 0, 0,"#countPear","#avgPear");
//var watermelons = new FruitObject("watermelon", randomNumber(1, 999), 0, 0);

//console.log(fruitArray);
}
