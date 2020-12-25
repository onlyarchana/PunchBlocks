var player
const World = Matter.World
const Engine = Matter.Engine
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint

var gameState = "PLAY"
var bg;

var myEngine, myWorld
var p = []
var chain = []
var maxLives = 3

function preload(){
  punch = loadImage("fist.png");
  bg = loadImage("background.jpg");
  blocksImg = loadImage("bricks.png"); 
}

function setup() {
  createCanvas(1100,600);
  myEngine = Engine.create()
  myWorld = myEngine.world


  
  for (var i = 0; i <maxLives; i++){
    p.push(new ball(400+i*60,50+(-i*10)))
  }
  
 Matter.Body.setStatic(p[0].player,true)
 // obstacleGroup
  Lgroup = createGroup();
  Bgroup = createGroup();

  //chain.push(new snake(p[0].player,p[1].player))
  for(var i =0;i<p.length;i++){
    if(i!==p.length-1){
    chain.push(new snake(p[i].player,p[i+1].player))
    }
  }

  console.log(chain)
   
}

function draw() {
  background(bg);
    

  fill("yellow");
  textSize(25);
  text("Life :"+ maxLives, 1000,50 );

 
  Engine.update(myEngine)
  if(gameState === "PLAY"){

    if(p[0].player.position.x > 5 ){
    
    if(keyIsDown(LEFT_ARROW))
    p[0].player.position.x = p[0].player.position.x - 10
    }
   
    if(p[0].player.position.x < 1095) {
    if(keyIsDown(RIGHT_ARROW))
    p[0].player.position.x = p[0].player.position.x + 10
    }
 
    for (var i = 0; i <p.length; i++){
      p[i].display()
    }
    spawnBlocks();
    spawnLife();
    
    

    if(detectCollision(Lgroup, p[0].player)){
      maxLives = maxLives + 1;
      p.push(new ball(400+3*60,50+(-3*10)))
      
      chain.push(new snake(p[maxLives-2].player,p[maxLives-1].player))
      Lgroup.destroyEach();
    }

    if(detectCollision(Bgroup, p[0].player)){
      maxLives = maxLives - 1;
      Bgroup.destroyEach();
      World.remove(myWorld,p[p.length - 1].player)
      p.pop();
    }

  if(maxLives === 0){
    gameState = "END";
  }
}
else if(gameState === "END"){

Bgroup.setVelocityYEach(0);
Lgroup.setVelocityYEach(0);
Bgroup.setLifetimeEach(-1);
Lgroup.setLifetimeEach(-1);

var resetButton = createButton("Restart");
resetButton.position(width/2,height/2);
resetButton.mousePressed(() => {
   
  location.reload()

})

}

/*for(var i =0;i<chain.length;i++){
  chain[i].display()
}*/
  drawSprites();
}

/*function keyPressed(){
  if(keyCode === 37 && gameState === "PLAY") {
    // MOVE ALL THE ARRAY ELEMENTS
    
      p[0].player.position.x = p[0].player.position.x - 30
     
    
  }

  if(keyCode === 39 && gameState === "PLAY") {
      p[0].player.position.x = p[0].player.position.x + 30
    //player.position.x = player.position.x + 30
  
 }
}*/

function spawnBlocks() {
  if(frameCount %110 === 0) {
    var blocks = createSprite(random(20,1080),10,105,105);
    blocks.addImage(blocksImg);
    blocks.scale = 0.5;
    blocks.shapeColor = "red";
    blocks.velocityY  = 7;

    Bgroup.add(blocks);
    blocks.lifetime = 200;
    
  }  
}

function spawnLife(){
  if(frameCount %200 === 0){
    var life = createSprite(random(20,1080),10)
    life.addImage(punch);
    life.scale = 0.2;
    life.velocityY = 7;
    Lgroup.add(life)
    life.lifetime = 200;

  }
}

function detectCollision(group,body){
  for(var i =0; i < group.length;i++){
  if(Math.abs(body.position.y - group[i].y) < 50+105/2 && Math.abs(body.position.x - group[i].x) < 50+105/2){
    return true
    //console.log(" collision")
    //group[i].velocityY = 0
  }
}
}