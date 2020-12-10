var dog, happyDog;
var database;
var foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();

  foodObj = new Food();

  dog = createSprite();
  dog.addImage(dogImg);
  dog.scale = 0.15

  feed = createButton("Feed The Dog");
  feed.position();
  feed.mousePressed(feedDog);

  addFood = createSprite("Add Food");
  addFood.position();
  addFood.mousePressed(addFoods);8
  
}


function draw() {  
background(46,139,87);
  
 fedTime = database.ref("FeedTime");

 fedTime.on("value",function(data){
   lastFed = data.val();
 })

 fill(255);
 textSize(20);

 if(lastFed >= 12){
   text("last Fed :" + lastFed % 12 + "PM" , 350,30);
 }
 else if(lastFed === 0){
   text("last Fed : 12 AM",250,30);
 }
 else{
   text("last Fed : " + lastFed + "AM" , 350,30);
 }

 foodObj.display();
 
 drawSprites();
 
}

function readStock(data){
  foodS = data.val();
  foodObj.upgradeFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.upgradeFoodStock(foodObj.getFoodStock()- 1)
  database.ref('/').upgrade({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').upgrade({
    Food: foodS
  })
}

