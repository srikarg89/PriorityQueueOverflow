// let sizeStep = 0;
// let initialSize = 800;
//
// function setup() {
//   createCanvas(initialSize * 2 - 1,initialSize * 2 - 1);
//   background(0,0,0);
//   stroke(255,255,255);
//   circle(initialSize,initialSize,25);
// }
//
// function draw() {
//   stroke(0,15,225);
//   strokeWeight(1);
//   noFill();
//   rect(initialSize,initialSize,initialSize - sizeStep,initialSize - sizeStep);
//   if(frameCount % 5 == 0)
//     sizeStep += 10;
//   stroke(255,0,0);
//   rect(0,initialSize,initialSize - sizeStep, initialSize - sizeStep);
//   stroke(255,0,255);
//   rect(initialSize,0,initialSize - sizeStep, initialSize - sizeStep);
//
//   stroke(255,255,255);
//   strokeWeight(10);
//   line(initialSize,initialSize,initialSize,0);
//   line(initialSize,initialSize,0,initialSize);
//   line(initialSize,initialSize,initialSize,2 * initialSize);
//   line(initialSize,initialSize,2 * initialSize,initialSize);
//
//   stroke(255,255,255);
//   strokeWeight(55);
//   fill(255);
//   circle(initialSize,initialSize,25 + sizeStep / 10);
//
//   circle(initialSize,initialSize,25);
// }
//
// function mouseDragged()
// {
//   strokeWeight(1);
//   circle(mouseX,mouseY,5,5);
//   return false;
// }
p5.disableFriendlyErrors = true;
let max_distance;
let counter;
var backgroundColor;
var fillColor;
let transition;
let fade;
let font;
let img;
let notReached;
function preload()
{
    img = loadImage("Rocket2.png");
}
function setup() {
  font = loadFont("Roboto-Bold.ttf");
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  max_distance = dist(0, 0, width, height);
  counter = 0;
  backgroundColor = color(255,255,255);
  fillColor = color(0,0,0);
  transition = 0;
  fade = 0;
  notReached = false;
}

function draw() {

  background(lerpColor(fillColor, backgroundColor,transition));
  transition += 0.01;
  fill(lerpColor(backgroundColor, fillColor,transition));

  if(transition > 1)
  {
    if(counter == 0)
    {
      fillColor = color(255,255,255);
      backgroundColor = color(0,0,0);
      transition = 0;
      counter++;
    }
    else {
      backgroundColor = color(255,255,255);
      fillColor = color(0,0,0);
      transition = 0;
      counter--;
    }
  }
  // if(frameCount % 16 == 0)
  // {
  //   mouseDragged();
  // }
  // if(frameCount % 5  == 0)
  // {
  //   mouseReleased();
  // }
    for (let i = 0; i <= width; i += 35) {
      for (let j = 0; j <= height; j += 35) {
        let size = dist(window.innerWidth / 2 - 60, window.innerHeight / 2 - 24, i, j);
        size = (size / max_distance) * 150;
        ellipse(i, j, size, size);
      }
    }
    // fill(lerpColor(fillColor, backgroundColor,transition));
    // textFont(font, 50);
    // text("Rocket Studios", 405, 550);
    //if(frameCount % 2 == 0)
    //{
    image(img, window.innerWidth / 2 - 187, window.innerHeight / 2 - 125, 256, 256);
    // tint(255, 255 - fade);
    // if(notReached == false)
    //   fade+=5;
    // else
    // {
    //   fade -=5;
    // }
    //
    // if(fade == 255)
    // {
    //   notReached = true;
    // }
    // if(fade == 0)
    // {
    //   notReached = false;
    // }
   //}
}
