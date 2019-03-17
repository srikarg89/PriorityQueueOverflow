class BodyTube{

  constructor(d = 24.9, h = 25){
    this.diameter = d;
    this.height = h;
    this.d_unit = 1;
    this.h_unit = 1;
    this.DIAMETER_SCALE = 10;
    this.HEIGHT_SCALE = 10;
    this.toDraw = true;
    this.createElements();
    this.font = loadFont('assets/Avenir.otf');
  }

  createElements(){
    this.inputH = createInput(''+this.height);
    this.inputR = createInput(''+this.diameter);
    this.unitH = createSelect();
    this.unitH.option('cm', 1);
    this.unitH.option('mm', .1);
    this.unitH.option('in', 2.5);
    this.unitD = createSelect();
    this.unitD.option('cm', 1);
    this.unitD.option('mm', .1);
    this.unitD.option('in', 2.5);
  }

  activate(){
    if(!this.isActive){
      this.createElements();
      this.makeGUI();
      this.isActive = true;
    }
  }

  deactivate(){
    this.inputH.remove();
    this.inputR.remove();
    this.unitH.remove();
    this.unitD.remove();
    this.isActive = false;
    console.log("HELLLO");
  }

  makeGUI(){
    this.inputH.position(180,100);
    this.inputH.size(70,20);
    this.inputR.position(180,180);
    this.inputR.size(70,20);
    this.unitH.position(260,100);
    this.unitH.size(55,20);
    this.unitD.position(260,180);
    this.unitD.size(55,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Height: ', -windowWidth/2 + 120, -windowHeight/2 + 88, 200, 100);
    text('Diameter: ', -windowWidth/2 + 110, -windowHeight/2 + 168, 200, 100);

    textSize(20);
    text('Body Tube Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(){
    if(!this.toDraw)
      return;

    this.h_unit = this.unitH.elt.value;
    this.d_unit = this.unitD.elt.value;
    if(!isNaN(this.inputH.elt.value)){
      this.height = this.inputH.elt.value;
    }
    if(!isNaN(this.inputR.elt.value)){
      this.diameter = this.inputR.elt.value;
    }
    push();
    fill(0,0,255);
    translate(0,-this.HEIGHT_SCALE*this.h_unit*this.height/2);
    cylinder(this.d_unit * this.diameter * this.DIAMETER_SCALE / 2, this.h_unit * this.height * this.HEIGHT_SCALE);
    pop();

  }



}
