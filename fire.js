let system;
let button;
let cond = false;
function setup() {
  button = createButton('Begin Launch!');
  button.position(400,50);
  button.size(100,50);
  button.mousePressed(launch);

  createCanvas(720, 400, WEBGL);
  system = new ParticleSystem(createVector(width / 2, 300,1));
}
function launch(){
  background(51);
  button.remove();
  cond = true;
}
function draw() {
  if(cond){

  system.addParticle();
  system.run();
}
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 0),0);
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(255,0,0);
  push();
  translate(this.position.x, this.position.y);
  sphere(12);
  pop();
};

// Is the particle still useful?
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
