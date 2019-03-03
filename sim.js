let size = 30;
let button;
let noseConeShow = true;
var nose;
var font;
var noseConeData;
//let ellipsoid;
var triangle_model;

var mass, a, thrus, t, cd, d, t_high;
var alti, fallv, tim;
let s = 0;
let cond = false;
let system;
function setup() {
  createCanvas(900,600,WEBGL);

//  ellipsoid = loadModel('Ellipsoid.obj');
  nose = new NoseCone(40,70,2);
  //noseConeData = new NoseConeData();
  button = createButton('Begin Launch!');
  button.position(400,50);
  button.size(100,50);
  console.log(button);
  button.elt.setAttribute("id", "launch");
  button.mousePressed(launch);
  triangle_model = loadModel('assets/306090.obj');
  font = loadFont('assets/Avenir.otf');
}

function draw() {
  background(100);
  displayRocket();
  textFont(font);
  fill(255,255,255);
  textSize(20);
  text('Time: ',-440,-285,20,20);
  text('Altitude: ',-440,-240,20,20);
  text('Velocity: ',-440,-195,20,20);
  text('Thrust: ',-440,-150,20,20);

  if(cond){
    text(s, -400,285,20,20);
    if(s<=t){
      text(s * alti/tim, -400,-240,20,20);
      text(Math.random()*5 + alti/tim, -400,-195,20,20);
      text(cur_thrust(s),-400,-150,20,20);
    }
    else if(s<=tim){
      text(s * alti/tim, -400,-240,20,20);
      text(Math.random()*5 + alti/tim, -400,-195,20,20);
      text("0",-400,-150,20,20)
    }
    else{
      text(alti-s*fall_v, -400,-195,20,20);
      text(-1*fall_v, -400,-240,20,20);
      text("0",-400,-150,20,20);
    }
    s+=0.1;
  }
}

function launch(){
  button.remove();
  cond = true;
}


displayRocket = function(){
  let rotateMouse = map(mouseX,0,width,-2*PI,2*PI);
  let rotateMouse1 = map(mouseY,0,height,-2*PI,2*PI);

  //Point being rotated at: 0, -180
  //Starting point: 0,20
  //Ending point: 0,-380
  noStroke();
  push();
  translate(0,-40);
//  rotateY(rotateMouse);
//  rotateX(rotateMouse1);
  translate(0,-100);
  rotateX(PI);
  fill(255,0,0);
  nose.draw(noseConeShow);
  translate(0,-160);
  fill(0,0,255);
  cylinder(40,250);
  push();
  translate(0,-120,0);
  fill(0,0,0);
  cylinder(20,50);
  pop();
  fill(255,0,255);
  push();
  translate(0,-125);
  rotateZ(PI/2);
  rotateX(PI/3);
  scale(30,60,30);
  model(triangle_model);
  pop();
  translate(0,-125);
  rotateZ(PI/2);
  rotateX(-PI/3);
  scale(30,60,30);
  model(triangle_model);
  pop();

}
function cur_thrust(s){
  low = Math.max(0,2*thrus-t_high);
  return s * (t_high-low)/tim + low
}
function altitude(mass, a, thrust, t, cd){
  k = 0.5*1.2*cd*a;
  g = 9.80665;
  mg = g * mass;
  q = Math.pow(((thrust-mg)/k),.5);
  x = 2*k*q/mass;
  v = q*(1-Math.pow(Math.E,(-x*t))/(1+Math.E**(-x*t)));
  b = ((-1*mass)/(2*k))*Math.log((thrust - mass*g - k*(v**2)) / (thrust - mass*g));
  c = (mass / (2*k))*Math.log((mass*g + k*Math.pow(v,2)) / (mass*g));

  p = -1.223;
  burnvel = 213.4473 * (1-Math.E**(p*t))/(1+Math.E**(p*t));
  qa = Math.pow(((mass * g)/k),0.5);
  qb = Math.pow(((g * k)/mass),0.5);

  return [Math.atan(burnvel/qa)/qb, b+c];
}
function fall_v(mass, d){
    cd = 1.3;
    r = 1.229;
    pi = Math.PI;

    return Math.pow(((8*mass*9.80665)/(pi*r*cd*(d**2))),0.5);
}
