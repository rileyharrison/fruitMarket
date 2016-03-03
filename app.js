// TODO  add a graph showing the fluctuations in the fruit market.
// TODO add points on the graph showing what prices you bought specific fruits
// at over the course of time. The idea is seeing if you are underwater on your fruits.












$(document).ready(function(){
    // prevent submit
    $("#fruitForm").on("submit", function(event){
        event.preventDefault();
    });
    //call initialize fruits
    //set interval 15000
    initializeFruits();
    createListener();

    timer = window.setInterval(updateFruit, conUpdateInterval);
    countDown = window.setInterval(updateTime, conTickInterval);
    displayFruit();
});

// declare variables

//congiguration variables
var conStartMoney = 10000;
var conUpdateInterval= 15000;
var conTickInterval = 1000;
var conTotalTime = 300;

var conPriceMax = 999;
var conPriceMin = 50;
var conPriceSwingUp = 50;
var conPriceSwingDown = -50;
var conTotalCycles = 20;


var timer;
var countDown;
var timerCounter = 0;
var fruitArray = [];
var userMoney = conStartMoney;
var timeLeft = conTotalTime;

FruitObject = function(fruitType, price, totalSpent, totalBought, showCount, showAvg, onHand, avgPrice){

    // console.log("in function fruit constructor");
    this.fruitType = fruitType;
    this.price = price;
    this.totalSpent = totalSpent;
    this.totalBought = totalBought;
    this.showCount = showCount;
    this.showAvg = showAvg;
    this.onHand = onHand;
    this.avgPrice = avgPrice;
    fruitArray.push(this);
};

function updateTime(){
    timeLeft--;
    $('#showTimer').text(timeLeft);
}

function buyFunction (){

    var fruitIndex = $(this).parent().data("fruitIndex");
    var fruit = fruitArray[fruitIndex];
    var currentPrice=fruit.price;

    if(userMoney > currentPrice){
        userMoney -= currentPrice;
        fruit.totalBought++;
        fruit.onHand++;
        fruit.totalSpent+=currentPrice;
    };
    updateStats();
    displayFruit();
};

function sellFunction (){

    // console.log("in function sellfunction", userMoney);
    var fruitIndex = $(this).parent().data("fruitIndex");
    var fruit = fruitArray[fruitIndex];
    var currentPrice=fruit.price;

    if (fruit.onHand>0){
        fruit.onHand--;
        // console.log("userMoney sellling fruit!!!!!!!!!!", userMoney);
        // console.log("UM currentPrice", userMoney, currentPrice);
        userMoney+=currentPrice;
        // console.log("userMoney sellling fruit!!!!!!!!!!", userMoney);
    }
    updateStats();
    displayFruit();

};

function updateStats(){

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

        // will it break?
        myFruit.avgPrice = myAverage;
        $(myFruit.showCount).text(myFruit.totalBought);
        $(myFruit.showAvg).text(myAverage);
    }

    // console.log("user money in update", userMoney);
    $("#showCash").text('$'+(userMoney/100).toFixed(2));

};



function randomNumber(min, max){
    // console.log("in function random number");
  var randomPrice = Math.floor(Math.random() * (1 + max - min) + min);
  return randomPrice;
};

function priceChange(fruit){
    // console.log("in function priceChange");

    fruit.price += randomNumber(conPriceSwingDown, conPriceSwingUp);
    if (fruit.price < conPriceMin) {
        fruit.price = conPriceMin;
    }
    if (fruit.price > conPriceMax) {
        fruit.price = conPriceMax;
    }
};

function updateFruit(){
    //check for time limit
    // console.log("in function update fruit");
    timerCounter++;
    // console.log(timerCounter);
    //loop through fruitArray
    //pass each fruit to pricechange function
    for(var i = 0; i<fruitArray.length; i++){
        //console.log(fruitArray[i]);
        priceChange(fruitArray[i]);
    }
    //dynamically display all info about fruits
    displayFruit();
    // TODO
    if(timerCounter == conTotalCycles){
        gameOver();
    }
};

function displayFruit(){
    //call data from FruitObjects - put into html elements
    // console.log("in display fruit");
    $('.fruit-bin').empty();
    $('.fruit').remove();
    var fruit = [];
    for(var i = 0; i<fruitArray.length; i++){
        fruit = fruitArray[i];
        $('.fruit-bin').append('<div class=" col-md-1 fruit fruit' + fruit.fruitType + '"></div>');
        $el = $('.fruit-bin').children().last();
        //console.log("preparing to append data key to fruitIndex of:", i);
        $el.append('<button class= "buy ' + fruit.fruitType +'">' + fruit.fruitType + '</button>');
        $el.append('<p>Price:   ' + (fruit.price/100).toFixed(2) + '</p>');
        $el.append('<p>On Hand:   ' + fruit.onHand + '</p>');
        $el.append('<p>Avg. Price:   ' + fruit.avgPrice + '</p>');
        $el.append('<button class= "sell">Sell</button>');
        $el.data("fruitIndex", i);
    }
};

function gameOver(){
    // console.log("in function game over");
  window.clearInterval(timer);
    window.clearInterval(countDown);
  for (i=0; i<fruitArray.length; i++){  }
  console.log("all done");
    //clearInterval
    //sell everything
    //display stats
    //subit button {no code easy peasy}
};

function createListener(){
    console.log("in function create listner");
    //
    // $('.fruit-bin').off().on('click', '.sell', sellFunction);
    // $('.fruit-bin').off().on('click', '.buy', buyFunction);


    $('.fruit-bin').on('click', '.sell', sellFunction);

    $('.fruit-bin').on('click', '.buy', buyFunction);



};

function initializeFruits(){

    // console.log("in function initialize fruits");

    var apples = new FruitObject("apple", randomNumber(conPriceMin, conPriceMax), 0, 0,"#countApple","#avgApple",0,0);
    var oranges = new FruitObject("orange", randomNumber(conPriceMin, conPriceMax), 0, 0,"#countOrange","#avgOrange",0,0);
    var bananas = new FruitObject("banana", randomNumber(conPriceMin, conPriceMax), 0, 0,"#countBanana","#avgBanana",0,0);
    //var grapes = new FruitObject("grape", randomNumber(1, 999), 0, 0);
    var pears = new FruitObject("pear", randomNumber(conPriceMin, conPriceMax), 0, 0,"#countPear","#avgPear",0,0);
    //var watermelons = new FruitObject("watermelon", randomNumber(1, 999), 0, 0);

    //console.log(fruitArray);
};
