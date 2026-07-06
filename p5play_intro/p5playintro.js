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
}

function draw() {
  // write your codes here
}