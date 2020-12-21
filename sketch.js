var office, officeImage;
var doctor, doctorImage;
var covid19, covid19Image;
var vaccine, vaccineImage;
var score=0;
var obstaclesGroup;
var vaccineGroup;
var gameState="PLAY";

function preload(){
officeImage = loadImage("FLOOR.jpg");
doctorImage = loadImage("doctorPiC.png");
covid19Image = loadImage("GERM.png");
vaccineImage = loadImage("VACCINE.png");
  
}

function setup() {
createCanvas(600, 600);

      //Creating office background
      office = createSprite(300, 300);
      office.addImage(officeImage);
      office.setVelocity(0, 1);
      office.scale=1.95;

      //Creating doctor sprite
     doctor = createSprite(150, 300, 10, 10);
     doctor.addImage(doctorImage);
    doctor.scale=0.2;
   

    //Creating new groups
      vaccineGroup=new Group();
      obstaclesGroup=new Group();
  
  score=0;
  
  }

function draw() {
background("black");



  if (gameState==="PLAY"){
    
  if (keyDown("right")){
    doctor.x=doctor.x+5;
  }
  if (keyDown("left")){
    doctor.x=doctor.x-5;
  }
  if (keyDown("up")){
    doctor.y=doctor.y-5;
  }
  if (keyDown("down")){
    doctor.y=doctor.y+5;
  }
  
  if (office.y>400){
   office.y=office.width/2;
 }
  if (doctor.isTouching(vaccineGroup)){
    score=score+2;
    vaccineGroup.destroyEach();
  }
  }
  
    if (obstaclesGroup.isTouching(doctor)){
    doctor.destroy();
    gameState="END";
  }
  
  if (gameState==="END"){
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityEach(0,0);
    vaccineGroup.destroyEach();
    vaccineGroup.setVelocityEach(0,0);
    office.destroy();
    score.visible=false;
    
    textSize(35);
    text("GAME OVER!", 200,200);
  }
 

  
  
//Calling functions and drawSprites();
spawnObstacles();
spawnVaccines();
drawSprites();
text("Score: "+ score, 80,90);  

}





function spawnObstacles(){
  if (frameCount%240===0){
    covid19 = createSprite(200, 0);
    covid19.addImage("germ", covid19Image);
    covid19.scale=0.04;
    covid19.velocityY=4;
    covid19.x=Math.round(random(120, 400));
    covid19.lifetime=800;
    obstaclesGroup.add(covid19);
    
    doctor.depth=covid19.depth;
    doctor.depth=doctor.depth+3;
  }
  
}

function spawnVaccines() {
  if (frameCount%200===0){
   vaccine = createSprite(200, 0);
  vaccine.addImage("medicine", vaccineImage);
  vaccine.scale=0.2; 
  vaccine.velocityY=4;
  vaccine.x=Math.round(random(120, 400));
  vaccine.lifetime=800;
  vaccineGroup.add(vaccine);
    
  //adjusting the depth  
doctor.depth=vaccine.depth;
doctor.depth=doctor.depth+3;
  }
  
  
}