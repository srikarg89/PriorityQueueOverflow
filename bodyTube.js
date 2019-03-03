var body_height, body_radius;
class BodyTube{

  constructor(radius = 40, height = 70){
    body_radius = radius;
    body_height = height;
    this.toDraw = true;
    this.inpH = createInput('');
    this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 15 && this.value() <= 200){nose_height = this.value();}} });
    this.inpR = createInput('');
    this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){nose_radius = this.value();}} });
    this.font = loadFont('assets/Avenir.otf');
  }

  setRadius(radius){
    body_radius = radius;
  }

  setHeight(height){
    body_hegight = height;
  }

  getRadius(){
    return body_radius;
  }

  getHeight(){
    return body_height;
  }

  makeGUI(){
    this.inpH.position(230,100);
    this.inpH.size(70,20);
    this.inpR.position(230,200);
    this.inpR.size(70,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Height: ', -windowWidth/2 + 170, -windowHeight/2 + 88, 200, 100);
    text('Radius: ', -windowWidth/2 + 170, -windowHeight/2 + 190, 200, 100);

    textSize(20);
    text('Body Tube Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(){
    if(!this.toDraw)
      return;
    push();
    translate(0,-160);
    fill(0,0,255);
    cylinder(40,250);
    pop();

  }



}
