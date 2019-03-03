let size = 30;
let button;
let noseConeShow = true;
var nose;
var font;
var noseConeData;
//let ellipsoid;
var triangle_model;

let cond = false;
let system;
function setup() {
  createCanvas(900,600,WEBGL);
  system = new ParticleSystem(createVector(width / 2, 50));
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
    system.addParticle();
    system.run();
  }
}

function launch(){
  button.remove();
  cond = true;
}
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(255,0,0);
  ellipse(this.position.x, this.position.y, 12, 12);
};
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};
let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

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
