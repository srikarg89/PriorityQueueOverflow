var body_height, body_radius;
class BodyTube{

  constructor(radius = 3, height = 25){
    body_radius = radius;
    body_height = height;
    this.RADIUS_SCALE = 40/3;
    this.HEIGHT_SCALE = 10;
    this.toDraw = true;
    this.inpH = createInput('');
    this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 40/this.HEIGHT_SCALE && this.value() <= 400/this.HEIGHT_SCALE){body_height = this.value();}} });
    this.inpR = createInput('');
    this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5/this.RADIUS_SCALE && this.value() < 125/this.RADIUS_SCALE){body_radius = this.value(); nose_radius = this.value();}} });
    this.font = loadFont('assets/Avenir.otf');
  }

  activate(){
    if(!this.isActive){
      this.inpH = createInput('');
      this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 40/15 && this.value() <= 400/15){body_height = this.value();}} });
      this.inpR = createInput('');
      this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5/25 && this.value() < 125/25){body_radius = this.value();} nose_radius = this.value();} });
      this.makeGUI();
      this.isActive = true;
    }
  }

  deactivate(){
    this.inpH.remove();
    this.inpR.remove();
    this.isActive = false;
    console.log("HELLLO");
  }

  setRadius(radius){
    body_radius = radius;
  }

  setHeight(height){
    body_height = height;
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
    text('cm', -windowWidth/2 + 310, -windowHeight/2 + 88, 80, 50);
    text('cm', -windowWidth/2 + 310, -windowHeight/2 + 190, 80, 50);

    textSize(20);
    text('Body Tube Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(){
    if(!this.toDraw)
      return;

    push();
    fill(0,0,255);
    translate(0,-230);
    translate(0,-(body_height-250));
    cylinder(body_radius * this.RADIUS_SCALE, body_height * this.HEIGHT_SCALE);
    pop();

  }



}
