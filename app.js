$(document).ready(function(){
    // prevent submit
    $("#fruitForm").on("submit", function(event){
        event.preventDefault();
    });
    //call initialize fruits
    //set interval 15000
    initializeFruits();
    timer = window.setInterval(updateFruit, 15000);
    displayFruit();
});

// declare variables

var timer;
var timerCounter = 0;
var fruitArray = [];
var userMoney = 10000;

FruitObject = function(fruitType, price, totalSpent, totalBought, showCount, showAvg, onHand){

    // console.log("in function fruit constructor");

    this.fruitType = fruitType;
    this.price = price;
    this.totalSpent = totalSpent;
    this.totalBought = totalBought;
    this.showCount = showCount;
    this.showAvg = showAvg;
    this.onHand = onHand;
    fruitArray.push(this);
};


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
    console.log("usermoney = ", userMoney);


    updateStats();
    displayFruit();

};

function sellFunction (){

    console.log("in function sellfunction", userMoney);
    var fruitIndex = $(this).parent().data("fruitIndex");
    var fruit = fruitArray[fruitIndex];
    var currentPrice=fruit.price;

    if (fruit.onHand>0){
        fruit.onHand--;
        console.log("userMoney sellling fruit!!!!!!!!!!", userMoney);
        console.log("UM currentPrice", userMoney, currentPrice);

        userMoney+=currentPrice;
        console.log("userMoney sellling fruit!!!!!!!!!!", userMoney);
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
        $(myFruit.showCount).text(myFruit.totalBought);
        $(myFruit.showAvg).text(myAverage);
    }

    console.log("user money in update", userMoney);
    $("#showCash").text(userMoney);

};



function randomNumber(min, max){
    // console.log("in function random number");

  var randomPrice = Math.floor(Math.random() * (1 + max - min) + min);

  return randomPrice;
};

function priceChange(fruit){
    // console.log("in function priceChange");

    fruit.price += randomNumber(-50, 50);
    if (fruit.price < 50) {
        fruit.price = 50;
    }
    if (fruit.price > 999) {
        fruit.price = 999;
    }

};

function updateFruit(){
    //check for time limit
    // console.log("in function update fruit");

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
};

function displayFruit(){
    //call data from FruitObjects - put into html elements
    console.log("in display fruit");

    $('.fruit-bin').empty();

    $('.fruit').remove();

    var fruit = [];


    for(var i = 0; i<fruitArray.length; i++){

        fruit = fruitArray[i];


        $('.fruit-bin').append('<div class=" col-md-1 fruit fruit' + fruit.fruitType + '"></div>');
        $el = $('.fruit-bin').children().last();
        //console.log("preparing to append data key to fruitIndex of:", i);


        $el.append('<button class= "buy ' + fruit.fruitType +'">' + fruit.fruitType + '</button>');
        $el.append('<p>Price:' + (fruit.price/100).toFixed(2) + '</p>');
        $el.append('<p>On Hand:' + fruit.onHand + '</p>');

        $el.append('<button class= "sell">Sell</button>');


        $el.data("fruitIndex", i);

    }
    createListener();


};

function gameOver(){

    // console.log("in function game over");

  window.clearInterval(timer);
  console.log("all done");
    //clearInterval
    //sell everything
    //display stats
    //subit button {no code easy peasy}

};


function createListener(){
    // console.log("in function create listner");
    //
    // $('.fruit-bin').off().on('click', '.sell', sellFunction);
    // $('.fruit-bin').off().on('click', '.buy', buyFunction);


    $('.fruit-bin').on('click', '.sell', sellFunction);

    $('.fruit-bin').on('click', '.buy', buyFunction);



};

function initializeFruits(){

    // console.log("in function initialize fruits");

var apples = new FruitObject("apple", randomNumber(1, 999), 0, 0,"#countApple","#avgApple",0);
var oranges = new FruitObject("orange", randomNumber(1, 999), 0, 0,"#countOrange","#avgOrange",0);
var bananas = new FruitObject("banana", randomNumber(1, 999), 0, 0,"#countBanana","#avgBanana",0);
//var grapes = new FruitObject("grape", randomNumber(1, 999), 0, 0);
var pears = new FruitObject("pear", randomNumber(1, 999), 0, 0,"#countPear","#avgPear",0);
//var watermelons = new FruitObject("watermelon", randomNumber(1, 999), 0, 0);

//console.log(fruitArray);
};
