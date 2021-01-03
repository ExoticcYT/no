var Crewmate, Impostor, obstacle, speedSensors, irun, crun, r, taDa;
var START = 2;
var PLAY = 3;
var WIN = 0;
var DEFEAT = 1;
var gameState = PLAY;
var Life = 3;
var obstacleGroup, speedGroup;
var floorItIs, impostorImage, crewmateImage, speedImage, starryBackground, imposterRunImage, crewmateRunImage, obstacleImage;
var score = 0;
function preload(){
  impostorImage = loadImage("blackrun.gif");
  crewmateImage = loadImage("running.gif");
  starryBackground = loadImage("betterimage.jpeg");
  speedImage = loadImage("Screenshot 2020-12-31 at 2.54.42 PM.png");
  imposterRunImage = loadImage("Screenshot 2020-12-31 at 4.44.29 PM.png");
  crewmateRunImage = loadImage("Screenshot 2020-12-31 at 4.31.19 PM.png");
  obstacleImage = loadImage("no.png");
  buzzer = loadSound("wrong-answer-sound-effect.mp3");
  taDa = loadSound("Ta Da-SoundBible.com-1884170640.mp3");
} 
function setup(){
  createCanvas(windowWidth, windowHeight);
  Impostor = createSprite(100, height-350, 50, 50);
  Impostor.addImage(impostorImage);
  Impostor.scale = 0.2;
  Crewmate = createSprite(width-75, height-345, 50, 50);
  Crewmate.addImage(crewmateImage);
  Crewmate.scale = 0.34;
  irun = createSprite(110, height-410, 30, 30);
  irun.addImage(imposterRunImage);
  irun.scale = 0.32;
  crun = createSprite(600, height-410, 30, 30);
  crun.addImage(crewmateRunImage);
  crun.scale = 0.3;
  floorItIs = createSprite(335,height-110, width, 20);
  floorItIs.shapeColor = "grey";
  obstacle = createSprite(width + 20,height-200, 30, 30);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -4;
  obstacle.lifetime = 500;  
  obstacle.scale = 0.3;
  speedSensors = createSprite(width + 20,height-300, 50, 50);
  speedSensors.velocityX = -2;
  speedSensors.lifetime = 500;
  speedSensors.addImage(speedImage);
  speedSensors.scale = 0.2;
  speedSensors.y = Math.round(random(200,400));
  crun.visible = false;
  irun.visible = false;
}
function draw(){
  background(starryBackground);
  
  crun.visible = false;
  irun.visible = false;
  
  fill("white");
  textSize(25);
  text("Score = " + score, 285, 25);
  fill("white");
  textSize(25);
  text("Lives = " + Life, 289, 45);
  
  score = score + Math.round(getFrameRate()/60);
  
  crun.velocityX = Crewmate.velocityX;
  crun.velocityY = Crewmate.velocityY;
  irun.velocityX = Impostor.velocityX;
  irun.velocityY = Impostor.velocityY;
  crun.x = Crewmate.x;
  
  
  Crewmate.collide(floorItIs);
  Impostor.collide(floorItIs);
  crun.collide(floorItIs);
  irun.collide(floorItIs);
  
  Crewmate.velocityY = Crewmate.velocityY + 0.5;
  Impostor.velocityY = Impostor.velocityY + 0.5;
  
  Impostor.setCollider("rectangle", 50, 50, 300, 700);

  crun.setCollider("rectangle", 0, -140, 300, 500);
  
  if(frameCount % 510 === 0){
      speedSensors = createSprite(width + 20,height-300, 50, 50);
      speedSensors.velocityX = -2;
      speedSensors.lifetime = 500;
      speedSensors.addImage(speedImage);
      speedSensors.scale = 0.2
      speedSensors.y = Math.round(random(100,300)); 
      speedItUp();
    }

  if(frameCount % 250 === 0){
    obstacle = createSprite(670, height-200, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 500;  
    obstacle.scale = 0.3;
    charactersToJump();
  }
  
  charactersToJump();
  speedItUp();
  ImpostorWins();
  CrewmateWins();
  
  console.log(frameCount);
  
  if(keyDown("space") && Impostor.y >= 428 ){
    Impostor.velocityY = -15;
  }
  
  if(gameState == WIN){
    Impostor.destroy();
    Crewmate.destroy();
    irun.destroy();
    crun.destroy();
    floorItIs.destroy();
    obstacle.visible = false;
    speedSensors.visible = false;
    background("black");
    fill("white");
    textSize(50);
    text("Victory, Crewmate Is Dead", 50, 200);
    textSize(30);  
    text("press R to restart", 250, 270);
    if(keyDown("r")){
      gameState = PLAY;
      reset();
      obstacle.visible = true;
      speedSensors.visible = true;
    }
  }
  
  if(gameState == DEFEAT){
    Impostor.destroy();
    Crewmate.destroy();
    irun.destroy();
    crun.destroy();
    floorItIs.destroy();
    obstacle.visible = false;
    speedSensors.visible = false;
    background("black");
    fill("white");
    textSize(50);
    text("You Lose, Impostor Is Dead", 25, 200);
    textSize(30);  
    text("press R to restart", 250, 270);
    if(keyDown("r")){
      gameState = PLAY;
      Life = 3;
      reset();
      obstacle.visible = true;
      speedSensors.visible = true;
    }
  }
  
  drawSprites(); 
}
function charactersToJump(){
  if(Crewmate.isTouching(obstacle)){
    Crewmate.velocityY = -15;
  } else if(Impostor.isTouching(obstacle)){
    Life = Life - 1;
    obstacle.destroy();
    buzzer.play();
  }
}
function speedItUp(){
  if(Impostor.isTouching(speedSensors)){ 
    obstacle.velocityX = obstacle.velocityX - 2;
    speedSensors.velocityX = speedSensors.velocityX - 2;
    Crewmate.x = Crewmate.x - 50;
    speedSensors.destroy();
  }
}
function ImpostorWins(){
  if(Impostor.isTouching(crun)){
    gameState = WIN;
    taDa.play();
  }
}
function reset(){
  Impostor = createSprite(100, 350, 50, 50);
  Impostor.addImage(impostorImage);
  Impostor.scale = 0.2;
  
  Crewmate = createSprite(600, 345, 50, 50);
  Crewmate.addImage(crewmateImage);
  Crewmate.scale = 0.34;
  
  irun = createSprite(110, 410, 30, 30);
  irun.addImage(imposterRunImage);
  irun.scale = 0.32;
  
  crun = createSprite(600, 410, 30, 30);  
  crun.addImage(crewmateRunImage);
  crun.scale = 0.3;
  
  floorItIs = createSprite(335, 440, 900, 20);
  floorItIs.shapeColor = "grey";
  
  crun.velocityX = Crewmate.velocityX;
  crun.velocityY = Crewmate.velocityY;
  
  irun.velocityX = Impostor.velocityX;
  irun.velocityY = Impostor.velocityY;
  
  crun.x = Crewmate.x;
  
  
  Crewmate.collide(floorItIs);
  Impostor.collide(floorItIs);
  crun.collide(floorItIs);
  irun.collide(floorItIs);
  
  Crewmate.velocityY = Crewmate.velocityY + 0.5;
  Impostor.velocityY = Impostor.velocityY + 0.5;
  
  Impostor.setCollider("rectangle", 50, 50, 300, 700);
  
  crun.setCollider("rectangle", 0, -140, 300, 500);
  
}
function CrewmateWins(){
  if(Life == 0){
    gameState = DEFEAT;
  }
}