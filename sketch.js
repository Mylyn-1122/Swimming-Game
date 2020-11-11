var START = 0;
var PLAY = 1;
var END = 2;
var backgroundImg, bubbleImg, swimmingBoyImg, spikeImg, startImg, restartImg;
var swimmingBoy, bubble, obstacle, start;
var score = 0;
var air = 20;
var obstacleGroup
var gameState = START
var bubbleGroup;
var obstaclenumber = 200


function preload() {
  backgroundImg = loadImage("Images/Background.png");
  bubbleImg = loadImage("Images/Bubble.png");
  swimmingBoyImg = loadAnimation("Images/SwimmingBoy1.png","Images/SwimmingBoy2.png","Images/SwimmingBoy3.png","Images/SwimmingBoy4.png","Images/SwimmingBoy5.png");
  spikeImg = loadImage("Images/Spike1.png");
  spike2Img = loadImage("Images/Spike2.png");
  startImg = loadImage("Images/Start.png");
  restartImg = loadImage("Images/Restart.png");
}

function setup() {
  createCanvas(800,400);
  Background = createSprite(400, 200, 800, 400);
  Background.addImage(backgroundImg);
  Background.scale = 2.3;
  Background.velocityX = -3;
  swimmingBoy = createSprite(100, 200, 30, 30);
  swimmingBoy.addAnimation("image", swimmingBoyImg);
  swimmingBoy.scale = 0.5;
  swimmingBoy.setCollider("rectangle", 0, 0, 200, 100)
  start = createSprite(400, 200, 20, 20);
  start.addImage(startImg)
  restart = createSprite(400, 300, 30, 30)
  restart.addImage(restartImg)

  

  swimmingBoy.debug = true;

  obstacleGroup = new Group();
  bubbleGroup = new Group();

  
}




function draw() {
  background("black"); 
  
  if(gameState === START){
    Background.visible = false;
    swimmingBoy.visible = false;
    start.visible = true;
    restart.visible = false

    if(mousePressedOver(start)){
      gameState = PLAY
    }

    drawSprites()

  }




  if(gameState === PLAY){
    if(Background.x < 0){
      Background.x = 700;
    }

    if(frameCount % 1600 === 0){
      obstaclenumber -= 5
    }

    start.visible = false;
    Background.visible = true;
    swimmingBoy.visible = true;
    restart.visible = false

    if(keyDown("down")){
      swimmingBoy.y += 20
    }
    if(keyDown("up")){
      swimmingBoy.y -= 20
    }

    score = score + 0.08
    air = air - 0.02

    if(frameCount % obstaclenumber === 0){
      var number = Math.round(random(1,2))
      if(number === 1){
        spawnObstacle()
      }
      else{
        spawnObstacleD()
      }
    }

    spawnBubble()

    if(bubbleGroup.isTouching(swimmingBoy)){
      air += 7;
      bubbleGroup.destroyEach()
    }

    drawSprites()

    fill("red")
    textSize(20)
    text("Score : " + Math.round(score), 700, 50)
    
    textSize(25)
    if(air > 5){
      fill("white")
    }
    else{
      fill("red")
    }
    text("Air : " + Math.round(air), 650, 50)

    if(obstacleGroup.isTouching(swimmingBoy) || air < 0){
      obstacleGroup.destroyEach()
      bubbleGroup.destroyEach()
      gameState = END;

    }
    
}




  if(gameState === END){
    swimmingBoy.visible = false
    Background.visible = false
    restart.visible = true
    start.visible = false

    drawSprites();

    textSize(20);
    fill("white")
    text("score : " + Math.round(score), 400, 100)

    if(mousePressedOver(restart)){
      restartFunction()
    }

  }

}





function spawnObstacle(){
  
    obstacle = createSprite(800, 75, 30, 30);
    obstacle.addImage(spikeImg);
    obstacle.scale = random(1, 1.7);
    obstacle.velocityX = -3;
    obstacle.lifetime = 240;
    obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, 0, 50, 120)
    obstacleGroup.add(obstacle)
  
}

function spawnObstacleD(){
  
    obstacle = createSprite(800, 325, 30, 30);
    obstacle.addImage(spike2Img);
    obstacle.scale = random(1, 1.7);
    obstacle.velocityX = -3;
    obstacle.lifetime = 240;
    obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, 0, 50, 120)
    obstacleGroup.add(obstacle)
  
}

function spawnBubble(){
  if(frameCount % 250 === 0){
    bubble = createSprite(800, random(30, 270), 20, 20);
    bubble.addImage(bubbleImg);
    bubble.scale = 0.10;
    bubble.velocityX = -4;
    bubble.lifetime + 210;
    bubbleGroup.add(bubble)
  }
}

function restartFunction(){
  obstacleGroup.destroyEach();
  bubbleGroup.destroyEach();
  obstaclenumber = 200;
  air = 20;
  score = 0;
  gameState = START;
}