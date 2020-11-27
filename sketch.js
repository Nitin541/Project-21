var bullet, wall, origThickness, appThickness, origSpeed, appSpeed, deformation, kinetic, weight;
var convertedSpeed;

function setup () {
  createCanvas(1800,400);

  origSpeed = Math.round(random(1000,2000));
  appSpeed = origSpeed / 100;

  weight = Math.round(random(10,80));

  bullet = createSprite(80,200,20,5);
  bullet.shapeColor = 'white';
  bullet.velocityX = appSpeed;

  origThickness = Math.round(random(2,8));
  appThickness = origThickness*10;

  wall = createSprite(1600,200,appThickness,250);
  wall.shapeColor = 'white';

  convertedSpeed = origSpeed * ( 5 / 18 );

  kinetic = 0.5 * (weight / 100) * convertedSpeed ** 2;
  deformation = kinetic / (origThickness ** 3);
  
}

function draw () {
  background('black');

  if (wall.x - bullet.x <= wall.width/2 + bullet.width/2){
    bullet.velocityX = 0;

    if (deformation <= 500){
      wall.shapeColor = 'lime';
    }
    if (deformation > 500){
      wall.shapeColor = 'red';
    }

  }

  drawSprites();

  stroke("lime");
  textSize(20);
  text("NOTE: Simulation is slowed down by 100 times",20,20);

  stroke('cyan');
  textSize(20);
  text("Bullet speed = " + origSpeed + " km/h and bullet weight = " + weight + " grams", 20,300);

  stroke('red');
  textSize(20);
  text("Wall thickness = " + appThickness + " centimetres",1500,20);

  if (bullet.isTouching(wall)){
    textSize(20);
    stroke('white');

    text("Deformation = " + Math.round(deformation), 900, 20);

    if (deformation > 1500){
      text("Never consider these parameters!!!", 875, 300);
    }
    if (deformation <= 500){
      text("Material properties accepted", 875, 300);
    }
    if (deformation > 500 && deformation <= 1500){
      text("Material properties rejected", 875, 300);
    }
  }
}