let size = 30;
let button;
let button_1;
let noseConeShow = true;
var nose;
var body;
var fins;
var font;
var motor;
var triangle_model;
var onCad = true;
var user_mass = 0;
var user_mass_inp;
var isOnMass = false;
var cond = false;
var s = 0;
var mass, a, thrus, t, cd, d, t_high;
var alti, fallv, tim;

function setup() {
  createCanvas(1280,600,WEBGL);
  nose = new NoseCone(6,10);
  body = new BodyTube(6,25);
  fins = new Fins(5,3,1,3);
  motor = new Motor();
  user_mass_inp = createInput('');
  user_mass_inp.input(function(e){ if(!isNaN(this.value())){if(this.value() > 40 && this.value() <= 4000){user_mass = this.value();}} else{alert('Must be an integer!');} });
  //Nose cone button
  button1 = createButton('Nose Cone');
  button1.position(0,0);
  button1.size(100,30);
  button1.elt.setAttribute("id", "nose_GUI");
  button1.mousePressed(nose_activate);

  //Body Tube
  button2 = createButton('Body Tube');
  button2.position(100,0);
  button2.size(100,30);
  button2.elt.setAttribute("id", "body_GUI");
  button2.mousePressed(body_activate);

  //fins
  button3 = createButton('Fins');
  button3.position(200,0);
  button3.size(100,30);
  button3.elt.setAttribute("id", "fins_GUI");
  button3.mousePressed(fins_activate);

  //Motor mount
  button4 = createButton('Motor');
  button4.position(300,0);
  button4.size(100,30);
  button4.elt.setAttribute("id", "motor_GUI");
  button4.mousePressed(motor_activate);

  button5 = createButton('Mass');
  button5.position(400,0);
  button5.size(100,30);
  button5.elt.setAttribute("id", "mass");
  button5.mousePressed(mass_tab);

  font = loadFont('assets/Avenir.otf');

  submit_button = createButton('Head to Launch!');
  submit_button.position(175,500);
  submit_button.size(150,60);
  submit_button.mousePressed(submit);

}

function mass_tab(){
  isOnMass = true;
  user_mass_inp = createInput('');
  user_mass_inp.input(function(e){ if(!isNaN(this.value())){if(this.value() > 40 && this.value() <= 4000){user_mass = this.value();}} else{alert('Must be an integer!');} });;
  user_mass_inp.position(250,100);
  user_mass_inp.size(60,20);
  fins.deactivate();
  nose.deactivate();
  body.deactivate();
  motor.deactivate();
  textFont(font);
  fill(0,0,0);
  textSize(15);
  text('Enter mass: ', -width/2 + 160, -height/2 + 88, 200, 100);
  text('g', -width/2 + 315, -height/2 + 90, 80, 50);
  textSize(20);
  text('Mass of completed rocket',-width/2 + 90,-height/2 + 30, 500,100);
}

function submit(){
  console.log(user_mass);
  if(user_mass <= 40 || user_mass >= 4000){
    alert('Invalid mass. Must be in the range of 40 grams to 4,000 grams.');
    return;
  }
  onCad = false;
  nose.deactivate();
  body.deactivate();
  motor.deactivate();
  fins.deactivate();
  user_mass_inp.remove();
  button1.remove();
  button2.remove();
  button3.remove();
  button4.remove();
  button5.remove();
  submit_button.remove();
  cond = true;
}

function draw(){
  background(100);
  if(onCad){
    first_draw();
  }
  else{
    second_draw();
  }
}

function first_draw() {
  background(100);
  displayRocket(true);
  if(nose.isActive){
    nose.makeGUI();
  }
  if(body.isActive){
    body.makeGUI();
  }
  if(fins.isActive){
    fins.makeGUI();
  }
  if(motor.isActive){
    motor.makeGUI();
  }
  if(isOnMass){
    textFont(font);
    fill(0,0,0);
    textSize(15);

    text('Enter mass: ', -width/2 + 170, -height/2 + 88, 200, 100);
    text('g', -width/2 + 315, -height/2 + 90, 80, 50);

    textSize(20);
    text('Mass of completed rocket',-width/2 + 150,-height/2 + 30, 500,100);
  }

}

function nose_activate(){
  nose.activate();
  body.deactivate();
  fins.deactivate();
  motor.deactivate();
  user_mass_inp.remove();
  isOnMass = false;
}

function body_activate(){
  body.activate();
  nose.deactivate();
  fins.deactivate();
  motor.deactivate();
  user_mass_inp.remove();
  isOnMass = false;
}

function fins_activate(){
  fins.activate();
  nose.deactivate();
  body.deactivate();
  motor.deactivate();
  user_mass_inp.remove();
  isOnMass = false;

}
function motor_activate(){
  motor.activate();
  nose.deactivate();
  body.deactivate();
  isOnMass = false;
  fins.deactivate();
  user_mass_inp.remove();

}
displayRocket = function(bool){
  let rotateMouse = map(mouseX,0,width,-2*PI,2*PI);
  let rotateMouse1 = map(mouseY,0,height,-2*PI,2*PI);

//  strokeWeight(5);
  nose.diameter = body.diameter;
  push();
  translate(300,0);
  if(bool){
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
  }
  translate(0,-100);
  rotateX(PI);
  fill(255,0,0);
  nose.draw();
  translate(0,0);
  body.draw();
  motor.draw(body.height*body.HEIGHT_SCALE*body.h_unit);
  fill(255,0,255);
  fins.draw(body.height*body.HEIGHT_SCALE*body.h_unit, body.diameter*body.DIAMETER_SCALE*body.d_unit);
  pop();
  fill(200,200,200);
  rect(-width/2,-height/2 - 20,width*2/5 - 12,height+20);
}

function altitude(mass, a, thrust, t, cd){
  k = 0.5*1.2*cd*a;
  g = 9.80665;
  mg = g * mass;
  q = Math.pow(((thrust-mg)/k),.5);
  x = 2*k*q/mass;
  v = q*(1-Math.pow(Math.E,(-x*t))/(1+Math.pow(Math.E,(-x*t))));
  b = ((-1*mass)/(2*k))*Math.log((thrust - mass*g - k*(Math.pow(v,2))) / (thrust - mass*g));
  c = (mass / (2*k))*Math.log((mass*g + k*Math.pow(v,2)) / (mass*g));

  p = -1.223;
  burnvel = 213.4473 * (1-Math.E**(p*t))/(1+Math.E**(p*t));
  qa = Math.pow(((mass * g)/k),0.5);
  qb = Math.pow(((g * k)/mass),0.5);

  return [Math.atan(burnvel/qa)/qb, b+c];
}

function fall_v1(mass, d){
    cd = 1.3;
    r = 1.229;
    pi = Math.PI;

    return Math.pow(((8*mass*9.80665)/(pi*r*cd*Math.pow(d,2))),0.5);
}

stationaryRocket = function(){

  //Point being rotated at: 0, -180
  //Starting point: 0,20
  //Ending point: 0,-380
  noStroke();
  push();
  translate(0,-40);
  translate(0,-100);
  rotateX(PI);
  nose.draw();
  translate(0,-160);
  body.draw();
  motor.draw();
  fill(255,0,255);
  translate(0,-125);
  rotateZ(PI/2);
  fins.draw(PI/3);
  fins.draw(-PI/3);
  fins.draw(PI);
  pop();
}

function second_draw() {
  background(100);
  stationaryRocket();
  textFont(font);
  fill(255,255,255);
  textSize(20);
  text('Time: ',-460,-285,20,20);
  text('Apogee: ',-460,-240,20,20);
  text('Velocity: ',-460,-195,20,20);

  if(cond){
    text(parseInt(s*1000), -385,-285,20,20);
    avg = motor.SPECS[motor_type][0];
    t = motor.SPECS[motor_type][1];
    max_t = motor.SPECS[motor_type][2];
    fuel = 100;

    if(s<=t){
      let aresquare = (nose_radius/100)*(nose_radius/100)
      let area = PI*aresquare;
      console.log(user_mass/1000)
      let arr = altitude(user_mass/1000, area, avg, t, 0.75)
      console.log(arr);
      let tim = arr[0];
      let alti = arr[1];
      let val = s * alti / tim
      console.log(alti);
      console.log(val);
      text(str(alti) + ' m', -350,-240,20,20);
      text(str(parseInt(Math.random()*5 + alti/tim)) + " m/s", -350,-195,20,20);
      console.log(tim);
    }
    else if(s<=tim){
      let aresquare = (nose_radius/100)*(nose_radius/100)
      let area = PI*aresquare;
      console.log(user_mass/1000)
      let arr = altitude(user_mass/1000, area, avg, t, 0.75)
      console.log(arr);
      let tim = arr[0];
      let alti = arr[1];
      text(str(alti) + ' m', -400,-240,20,20);
      text(str(parseInt(Math.random()*5 + alti/tim)), -350,-195,20,20);
      text("0",-400,-150,20,20)
    }
    else{
      let aresquare = (nose_radius/100)*(nose_radius/100)
      let area = PI*aresquare;
      console.log(user_mass/1000)
      let arr = altitude(user_mass/1000, area, avg, t, 0.75)
      console.log(arr);
      let tim = arr[0];
      let alti = arr[1];
      let fall_v = fall_v1(user_mass/1000, .35);
      console.log(fall_v);
      alti = alti-s*fall_v;
      if(alti<0)
        alti = 0;
      text(alti, -400,-195,20,20);
      text(-1*fall_v, -400,-240,20,20);
    }
    s+=0.005;
    console.log(alti);
  }
}
