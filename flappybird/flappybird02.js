let bird, floor; // Declaring variables for objects
let flapMidImg, bg, base; // Declaring variables for images
let pipeGroup;
let bottomPipe;
let topPipe;
let startScreenLabel;
let startScreenImg;
let startGame = false;
let numberImages = []
let scoreDigits ;

function preload() {
    // bird image, background and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
    downFlapImg = loadImage('assets/yellowbird-downflap.png');
    upFlapImg = loadImage('assets/yellowbird-upflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
    pipe = loadImage('assets/pipe-green.png')
    gameoverImg = loadImage('assets/gameover.png')
    startScreenImg = loadImage('assets/message.png')
    for (let i = 0; i < 10; i++) {numberImages[i] = loadImage('assets/' + i + '.png')}

}

function setup() {
  new Canvas(400, 600); 

  bird = new Sprite();
  bird.x = width / 2;
  bird.y = 200;
  bird.width = 30;
  bird.height = 30;
  bird.img = flapMidImg; 

  // Alternative compact syntax from line 12 (commented out):
  // bird = new Sprite(width / 2, 200, 30, 30, 'dynamic');
  bird.collider = "dynamic";
  bird.mass = 10;
  bird.drag = 0.02;
  bird.bounciness = 0;


  // Floor to bounce bird
  floor = new Sprite();
  floor.x = 200;
  floor.y = height - 20;
  floor.width = 400;
  floor.height = 125;
  floor.collider = "static";
  floor.img = base;
  pipeGroup = new Group();
  startScreenLabel = new Sprite(width/2,height/2,50,50,'none');
  startScreenLabel.img = startScreenImg
}
 function draw() {
  image(bg, 0, 0, width, height); // always draw background, even before game starts

  if (kb.presses('space') || mouse.presses()){
    startGame = true;
    startScreenLabel.visible = false;
  }
  if (startGame){
    if (bird.collides(pipeGroup) || bird.collides(floor))
    {
      gameoverLabel = new Sprite(width/2,height/2,192,42);
      gameoverLabel.img = gameoverImg;
      gameoverLabel.layer = 100
      gameoverLabel.x = camera.x
      noLoop();
    }
    world.gravity.y = 50;
    // Apply upward push when space is pressed
    if (kb.presses('space')) {
      bird.vel.y = -10;
      bird.sleeping = false;
    }
    if (mouse.presses()) {
      bird.vel.y = -10;
      bird.sleeping = false;
    }
    bird.x += 3;
    camera.x = bird.x;
    floor.x = bird.x;
    fill("blue");
    textSize(14);
    text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
    text('isMoving: ' + bird.isMoving, 10, 40);
    text('sleeping: ' + bird.sleeping , 10, 60);
    if (bird.vel.y < 0){
      bird.img = downFlapImg;
      bird.rotation = -15;
    } else if (bird.vel.y > 0){
      bird.img = upFlapImg;
      bird.rotation = 15;
    } else {
      bird.img = flapMidImg;
      bird.rotation = 0;
    }
    if (frameCount % 90 === 0){
      spawnPipePair();
    }
  }
}

function spawnPipePair(){
  let gap = 50;
  let midY = random(250,height-250);
  let spawnX = bird.x + 400; // spawn off-screen ahead of the bird, not at a fixed x

  bottomPipe = new Sprite(spawnX, midY + gap / 2 + 200, 52, 320, 'static');
  bottomPipe.img = pipe;
  pipeGroup.add(bottomPipe);

  topPipe = new Sprite(spawnX, midY - gap / 2 - 200, 52, 320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;
  pipeGroup.add(topPipe);

  pipeGroup.layer = 0; // only need this once, not per pipe
}
function drawScore(x,y,score,digitWidth,digitHeight) {
  scoreDigits.removeAll();
  let scoreStr = str(score);
  let total
}