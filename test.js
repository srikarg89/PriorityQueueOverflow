function setup(){
  createCanvas(600,600,WEBGL);
}

function draw(){
  background(100);
  let rotateMouse = map(mouseX,0,width,-2*PI,2*PI);
  let rotateMouse1 = map(mouseY,0,height,-2*PI,2*PI);
  fill(255,255,255);
  push();
//  rotateX(rotateMouse);
//  rotateY(rotateMouse1);
//  cylinder(30,100);
  pop();
}
