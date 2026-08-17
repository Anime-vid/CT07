let bird, floor; // Declaring variables for objects
let flapMidImg, bg, base; // Declaring variables for images
let downFlapImg, upFlapImg, pipe, gameoverImg; // now declared properly
let pipeGroup;
let bottomPipe;
let topPipe;
let startScreenLabel;
let startScreenImg;
let startGame = false;
let numberImages = [];
let scoreDigits;
let score = 0; // FIX: declared and initialized

function preload() {
    // bird image, background and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
    downFlapImg = loadImage('assets/yellowbird-downflap.png');
    upFlapImg = loadImage('assets/yellowbird-upflap.png');
    pipe = loadImage('assets/pipe-green.png');
    gameoverImg = loadImage('assets/gameover.png');
    startScreenImg = loadImage('assets/message.png');
    for (let i = 0; i < 10; i++) { numberImages[i] = loadImage('assets/' + i + '.png'); }
}

function setup() {
  new Canvas(400, 600);

  bird = new Sprite();
  bird.x = width / 2;
  bird.y = 200;
  bird.width = 30;
  bird.height = 30;
  bird.img = flapMidImg;

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
  scoreDigits = new Group(); // FIX: was never initialized, caused crash in drawScore()

  startScreenLabel = new Sprite(width / 2, height / 2, 50, 50, 'none');
  startScreenLabel.img = startScreenImg;
}

function draw() {
  drawScore(width / 2, 20, score, 24, 36);
  image(bg, 0, 0, width, height); // always draw background, even before game starts

  if (kb.presses('space') || mouse.presses()) {
    startGame = true;
    startScreenLabel.visible = false;
  }

  if (startGame) {
    if (bird.collides(pipeGroup) || bird.collides(floor)) {
      gameoverLabel = new Sprite(width / 2, height / 2, 192, 42);
      gameoverLabel.img = gameoverImg;
      gameoverLabel.layer = 100;
      gameoverLabel.x = camera.x;
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
    text('sleeping: ' + bird.sleeping, 10, 60);

    if (bird.vel.y < 0) {
      bird.img = downFlapImg;
      bird.rotation = -15;
    } else if (bird.vel.y > 0) {
      bird.img = upFlapImg;
      bird.rotation = 15;
    } else {
      bird.img = flapMidImg;
      bird.rotation = 0;
    }

    if (frameCount % 90 === 0) {
      spawnPipePair();
    }

    // FIX: score-incrementing logic — count once per pipe pair when the bird passes it
    for (let p of pipeGroup) {
      if (!p.scored && p.x < bird.x) {
        p.scored = true;
        if (p === bottomPipe) score++;
      }
    }
  }
}

function spawnPipePair() {
  let gap = 50;
  let midY = random(250, height - 250);
  let spawnX = bird.x + 400; // spawn off-screen ahead of the bird, not at a fixed x

  bottomPipe = new Sprite(spawnX, midY + gap / 2 + 200, 52, 320, 'static');
  bottomPipe.img = pipe;
  bottomPipe.scored = false; // FIX: needed for scoring logic above
  pipeGroup.add(bottomPipe);

  topPipe = new Sprite(spawnX, midY - gap / 2 - 200, 52, 320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;
  topPipe.scored = false;
  pipeGroup.add(topPipe);

  pipeGroup.layer = 0; // only need this once, not per pipe
}

function drawScore(x, y, score, digitWidth, digitHeight) {
  moveGroup(scoreDigits,camera.x,24);
  scoreDigits.removeAll();
  let scoreStr = str(score);
  let totalWidth = scoreStr.length * digitWidth;
  let startX = x - totalWidth / 2;
  for (let i = 0; i < scoreStr.length; i++) {
    let digit = int(scoreStr[i]);
    let xPos = startX + i * digitWidth;
    let digitSprite = new scoreDigits.Sprite(xPos, y, digitWidth, digitHeight);
    digitSprite.img = numberImages[digit];
  }
}
function moveGroup(group,targetX,spacing) {
  sta

}