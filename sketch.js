var buzo,buzoImg,star,starImg,piranha,piranhaImg,bg,bgImg;
var gameOverImg;
var piranhaG, starG;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score=0;
var gameOver, restart;
var reset;

function preload(){
 bgImg = loadImage("bg3.jpg");
  buzoImg = loadAnimation("buzo1.png","buzo2.png","buzo3.1.png","buzo4.1.png");
  starImg = loadImage("star.png");
  piranhaImg = loadImage("piranha.png");
  //cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("over.png");
}

function setup(){
  
createCanvas(1000,300);
// Fondo en movimiento
bg=createSprite(100,150);
bg.addImage(bgImg);


//crear el niño que corre
buzo  = createSprite(70,150);
buzo.addAnimation("moving",buzoImg);
  
//establece el colisionador para el mainCyclist
buzo.setCollider("rectangle",0,0,buzo.width,buzo.height);
buzo.debug = false;

  
gameOver = createSprite(600,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 1.2;
gameOver.visible = false;  
  
starG = new Group();
piranhaG = new Group();
  
}

function draw() {
  background("lightblue");
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Puntuación: "+ score,900,30);

  
   camera.position.x=displayWidth/6;

  if(gameState===PLAY){
    buzo.visible=true;
    gameOver.visible=false;
    bg.velocityX = -10;
    buzo.y = World.mouseY;
    edges= createEdgeSprites();
    buzo.collide(edges);

   
  

   if(starG.collide(buzo)){
    score=score+1;
    starG.destroyEach();
   }
  
    //código para reproducir el sonido de la campana del ciclista
 // if(keyDown("space")) {
  //  cycleBell.play();
  //}

  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,2));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      starSea();
    } else if (select_oppPlayer == 2) {
      piranhaSea();
    } 
  }
  
   if(piranhaG.isTouching(buzo)){
     gameState = END;
     buzo.velocityY = 0;
     piranhaG.destroyEach();
    }
    if(bg.x < 0 ){
      bg.x = width/4;
    }
   
  }
    
 if (gameState === END) {
  buzo.velocityX = 0;
  buzo.velocityY = 0;
  buzo.visible=false;
  bg.velocityX=0;
 
  piranhaG.velocityX=0;
  piranhaG.setLifetimeEach(-1);

  starG.velocityX=0;
  starG.setLifetimeEach(-1);


  //escribe la condición para llamar reset( )
if(keyDown("UP_ARROW")){
  reset();
  }
    gameOver.visible = true;
    //Agrega aquí el código para mostrar la instrucción de reinicio del juego, en forma de texto
    text("Presiona tecla flecha arriba para reiniciar",400,60);
  
   
}


}


function starSea(){
    star =createSprite(1100,Math.round(random(50, 250)));
    star.scale =0.1;
    star.velocityX = -5;
    star.addAnimation("moving",starImg);
    star.setLifetime=170;
    starG.add(star);
}

function piranhaSea(){
    piranha =createSprite(1100,Math.round(random(50, 250)));
    piranha.scale =0.2;
    piranha.velocityX =-5;
    piranha.addAnimation("moving",piranhaImg);
    piranha.setLifetime=170;
    piranhaG.add(piranha);
}

//crea aquí la función de reinicio
function reset(){
  
  gameState= PLAY;
  gameOver.visible=false;
  starG.destroyEach();
  starG.velocityX=0;
  piranhaG.velocityX=0;
  piranhaG.destroyEach();
  score=0;
  
 

}



