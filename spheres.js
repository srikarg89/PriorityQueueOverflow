let system;
let button;
let cond = false;
let i = -360;
function setup(){
  createCanvas(720, 400, WEBGL);
}
function draw(){
    translate(i+=20, -50);
    sphere(20);
}
