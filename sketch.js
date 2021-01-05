var sword, microbe;
var fruitGroup, enemyGroup, fruit1, fruit2, fruit3,fruit4, fruit;
var gameOverImg, swordImg, microbeImg;
var r;
var time;

var PLAY=1;
var END=0;
var gameState=1;

var score=0;

function preload(){
 swordImg=loadImage("sword.png");
 microbeImg=loadImage("alien1.png");
 fruit1=loadImage("fruit1.png");
 fruit2=loadImage("fruit2.png");
 fruit3=loadImage("fruit3.png"); 
 fruit4=loadImage("fruit4.png");
 gameOverImg=loadImage("gameover.png"); 
 
}

function setup(){
  createCanvas(600, 600);
  
  sword=createSprite(300,100);
  //sword.addImage("knife", swordImg);
  sword.addImage(swordImg);
  sword.scale=0.7;
  sword.setCollider("circle",0,0,40);
  //sword.debug=true;
  
  fruitGroup=new Group();
  microbeGroup=new Group();
  
  score=0;
}

function draw() { 
  background("lightblue"); 
  if(gameState===PLAY){ 
    //Call fruits and Enemy function 
    fruits();
    Enemy(); 
    // Move sword with mouse 
    sword.y=World.mouseY; 
    sword.x=World.mouseX; 
    // Increase score if sword touching fruit 
    if(fruitGroup.isTouching(sword)){ 
      fruitGroup.destroyEach(); 
      score=score+1; 
    } 
    else { 
      // Go to end state if sword touching enemy      
        if(microbeGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        microbeGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        microbeGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImg);
        sword.x=300;
        sword.y=300;
      } 
    }
  }
  drawSprites(); 
  //Display score 
  text("Score : "+ score,300,30); 
}

function fruits(){
  if(World.frameCount%60===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
      }
      else if(r==2){
        fruit.addImage(fruit2);
      }
      else if(r==3){
        fruit.addImage(fruit3);
      }
      else{
        fruit.addImage(fruit4);
      }
    
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    microbe=createSprite(400,200,20,20);
    microbe.addAnimation("moving", microbeImg);
    microbe.y=Math.round(random(100,300));
    microbe.velocityX=-8;
    microbe.setLifetime=50;
    
    microbeGroup.add(microbe);
  }
}
