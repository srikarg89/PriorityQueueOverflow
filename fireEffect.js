// http://codingtra.in
// http://patreon.com/codingtrain

// Fire Effect
// Video: https://youtu.be/X0kjv0MozuY
// Algorithm: https://web.archive.org/web/20160418004150/http://freespace.virgin.net/hugo.elias/models/m_fire.htm

var buffer1;
var buffer2;
var cooling;
var w = 600;
var h = 400;

var ystart = 0.0;

function setup() {
  createCanvas(1200, 400);
  buffer1 = createGraphics(w, h);
  buffer2 = createGraphics(w, h);
  cooling = createImage(w, h, RGB);
}

function cool() {
  cooling.loadPixels();
  let xoff = 0.0; // Start xoff at 0
  let increment = 0.02;
  // For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
  for (let x = 0; x < w; x++) {
    xoff += increment;   // Increment xoff
    let yoff = ystart;   // For every xoff, start yoff at 0
    for (let y = 0; y < h; y++) {
      yoff += increment; // Increment yoff

      // Calculate noise and scale by 255
      let n = noise(xoff, yoff);
      let bright = pow(n, 3) * 255;

      // Try using this line instead
      //float bright = random(0,255);

      // Set each pixel onscreen to a grayscale value
      cooling.pixels[x+y*w] = color(bright);
    }
  }

  cooling.updatePixels();
  ystart += increment;
}

function fire(rows) {
//  buffer1.beginDraw();
  buffer1.loadPixels();
  for (let x = 0; x < w; x++) {
    for (let j = 0; j < rows; j++) {
      let y = h-(j+1);
      let index = x + y * w;
      buffer1.pixels[index] = color(255);
    }
  }
  buffer1.updatePixels();
//  buffer1.endDraw();
}

function draw() {
  fire(2);
  console.log('hi');
  if (mouseIsPressed) {
//    buffer1.beginDraw();
    buffer1.fill(255);
    buffer1.noStroke();
    buffer1.ellipse(mouseX, mouseY, 100, 100);
//    buffer1.endDraw();
  }
  cool();
  background(0);
//  buffer2.beginDraw();
  buffer1.loadPixels();
  buffer2.loadPixels();
  for (let x = 1; x < w-1; x++) {
    for (let y = 1; y < h-1; y++) {
      let index0 = (x) + (y) * w;
      let index1 = (x+1) + (y) * w;
      let index2 = (x-1) + (y) * w;
      let index3 = (x) + (y+1) * w;
      let index4 = (x) + (y-1) * w;
      let c1 = buffer1.pixels[index1];
      let c2 = buffer1.pixels[index2];
      let c3 = buffer1.pixels[index3];
      let c4 = buffer1.pixels[index4];
      let c5 = cooling.pixels[index0];
      let newC = brightness(c1) + brightness(c2)+ brightness(c3) + brightness(c4);
      newC = newC * 0.25 - brightness(c5);

      buffer2.pixels[index4] = color(newC);
    }
  }
  buffer2.updatePixels();
//  buffer2.endDraw();

  // Swap
  let temp = buffer1;
  buffer1 = buffer2;
  buffer2 = temp;

  image(buffer2, 0, 0);
  image(cooling, w, 0);
}
