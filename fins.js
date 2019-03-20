class Fins{

  constructor(b, h, typ = 1, num = 3){
    this.TRAP_BASE_SCALE = 3;
    this.TRAP_HEIGHT_SCALE = 6;
    this.TRAP_MODEL = loadModel('assets/RightTrap.obj');
    this.TRIANGLE_BASE_SCALE = 15;
    this.TRIANGLE_HEIGHT_SCALE = 15;
    this.TRIANGLE_MODEL = loadModel('assets/454590.obj');
    this.THICKNESS_SCALE = 100;

    this.base = b;
    this.thickness = .5;
    this.height = h;
    this.type = typ;
    this.num = num;
    this.toDraw = true;
    this.createElements();

    this.font = loadFont('assets/Avenir.otf');
  }

  createElements(){
    this.dropdown = createSelect();
    this.dropdown.option('Trapezoidal', 1);
    this.dropdown.option('Triangular', 2);
    this.inputB = createInput(''+this.base);
    this.inputH = createInput(''+this.height);
    this.inputN = createInput(''+this.num);
    this.unitH = createSelect();
    this.unitH.option('cm', 1);
    this.unitH.option('mm', .1);
    this.unitH.option('in', 2.5);
    this.unitB = createSelect();
    this.unitB.option('cm', 1);
    this.unitB.option('mm', .1);
    this.unitB.option('in', 2.5);
  }

  activate(){
    this.dropdown.elt.hidden = false;
    this.unitH.elt.hidden = false;
    this.unitB.elt.hidden = false;
    this.inputH.elt.hidden = false;
    this.inputB.elt.hidden = false;
    this.inputN.elt.hidden = false;
    this.makeGUI();
    this.isActive = true;
  }

  deactivate(){
    this.dropdown.elt.hidden = true;
    this.unitH.elt.hidden = true;
    this.unitB.elt.hidden = true;
    this.inputH.elt.hidden = true;
    this.inputB.elt.hidden = true;
    this.inputN.elt.hidden = true;
    this.isActive = false;
  }

  makeGUI(){
    this.dropdown.position(50,100);
    this.inputH.position(230,100);
    this.inputH.size(70,20);
    this.inputB.position(230,180);
    this.inputB.size(70,20);
    this.inputN.position(230,260);
    this.inputN.size(70,20);
    this.unitH.position(320,100);
    this.unitB.position(320,180);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Height: ', -windowWidth/2 + 170, -windowHeight/2 + 88, 200, 100);
    text('Base: ', -windowWidth/2 + 180, -windowHeight/2 + 168, 200, 100);
    text('Number: ', -windowWidth/2 + 170, -windowHeight/2 + 248, 200, 100);

    textSize(20);
    text('Fins Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(body_height, body_diameter){
    if(!this.toDraw)
      return;
    this.h_unit = this.unitH.elt.value;
    this.b_unit = this.unitB.elt.value;
    this.type = this.dropdown.elt.value;
    if(!isNaN(this.inputH.elt.value)){
      this.height = this.inputH.elt.value;
    }
    if(!isNaN(this.inputB.elt.value)){
      this.base = this.inputB.elt.value;
    }
    if(!isNaN(this.inputN.elt.value)  && this.inputN.elt.value >= 2 && this.inputN.elt.value <= 5){
      this.num = this.inputN.elt.value;
    }
    let angle = 2*PI/this.num;
    fill(0,255,0);
    if(this.type == 1){
      push();
      rotateZ(PI/2);
      translate(-body_height,0,0);
      for(let i = 0; i < this.num; i++){
        push();
        rotateX(angle*i);
        translate(0,0,-body_diameter/2);
        scale(this.TRAP_BASE_SCALE*this.base*this.b_unit,this.THICKNESS_SCALE*this.thickness,this.TRAP_HEIGHT_SCALE*this.height*this.h_unit);
        model(this.TRAP_MODEL);
        pop();
      }
      pop();
    }
    else{
      push();
      rotateX(PI/2);
      translate(0,0,body_height);
      for(let i = 0; i < this.num; i++){
        push();
        rotateZ(angle*i);
        translate(body_diameter/2,0,0);
        scale(this.TRIANGLE_HEIGHT_SCALE*this.height*this.h_unit,this.THICKNESS_SCALE*this.thickness,this.TRIANGLE_BASE_SCALE*this.base*this.b_unit);
        model(this.TRIANGLE_MODEL);
        pop();
      }
      pop();
    }
  }



}
