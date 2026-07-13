let ball;
let box;
function setup() {
  // Set up the canvas
  new Canvas(800, 400);
  background(250); //background color
  ball = new Sprite();
  ball.x = 100
  ball.y = 200;
  ball.diameter = 40;
  ball.colour = 'blue';
  box = new Sprite();
  box.x = 100;
  box.y = 100;
  box.w = 50;
  box.h = 50;
  box.colour = "green"
  ball.vel.x = 20;
  ball.vel.y = 20;
  ball.bouncyness
}

function draw() {
    // what happens if you don't have this line? try it.
    background(240); // clear screen each frame

    // Showing coordinates for sprites
    fill(0);
    textSize(16);
    text("Ball: (" + int(ball.x) + ", " + int(ball.y) + ")", 10, 20);
    text("Mouse: (" + mouseX + ", " + mouseY + ")", 10, 40);

    // Animate ball by updating position automatically via velocity
    // Bounce off edges using manual wall check

    // if ball x position goes off the left wall or right wall
    if (ball.x < 0 + ball.diameter / 2 || ball.x > width - ball.diameter / 2) {
        ball.vel.x *= -1; // change +x to -x or vice versa
    }

    // if ball y position goes off the top or bottom
    if (ball.y < 0 + ball.diameter / 2 || ball.y > height - ball.diameter / 2) {
        ball.vel.y *= -1; // change +y to -y or vice versa
    }

    // Make follower follow the mouse
    box.x = mouseX;
    box.y = mouseY;
}