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
let score = 0;

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
  scoreDigits = new Group();

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

    // remove pipes once they're off-screen behind the camera
    for (let p of pipeGroup) {
      if (p.x < bird.x - 250) {
        p.remove();
      }
    }

    // increase score if pipe passed (edge-based comparison, per slide)
    for (let p of pipeGroup) {
      // center pos + half pipe width = right edge pos
      let pipeRightEdge = p.x + p.w / 2;
      // center pos - half bird width = left edge pos
      let birdLeftEdge = bird.x - bird.w / 2;

      // compare x-coordinates of player and pipes
      if (p.passed === false && pipeRightEdge < birdLeftEdge) {
        p.passed = true;
        if (p.isBottom) score++; // FIX: was comparing to the global `bottomPipe`, which gets reassigned every spawn
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
  bottomPipe.passed = false;
  bottomPipe.isBottom = true; // FIX: tag per-sprite instead of relying on the global bottomPipe reference
  pipeGroup.add(bottomPipe);

  topPipe = new Sprite(spawnX, midY - gap / 2 - 200, 52, 320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;
  topPipe.passed = false;
  topPipe.isBottom = false;
  pipeGroup.add(topPipe);

  pipeGroup.layer = 0; // only need this once, not per pipe
}

function drawScore(x, y, score, digitWidth, digitHeight) {
  scoreDigits.removeAll();
  let scoreStr = str(score);
  let totalWidth = scoreStr.length * digitWidth;
  let startX = x - totalWidth / 2;
  for (let i = 0; i < scoreStr.length; i++) {
    let digit = int(scoreStr[i]);
    let xPos = startX + i * digitWidth;
    let digitSprite = new scoreDigits.Sprite(xPos, y, digitWidth, digitHeight, 'none'); // FIX: was defaulting to 'dynamic', letting gravity/collisions act on the score digits
    digitSprite.img = numberImages[digit];
  }
  // FIX: moved outside the digit-creation loop — was re-running once per digit instead of once per frame
  moveGroup(scoreDigits, camera.x, digitWidth);
}

function moveGroup(group, targetX, spacing) {
  let totalWidth = (group.length - 1) * spacing;
  let startX = (targetX - totalWidth / 2);
  for (let i = 0; i < group.length; i++) {
    group[i].x = startX + i * spacing;
  }
}