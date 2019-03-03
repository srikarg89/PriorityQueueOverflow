var fin_type, base, thickness, height;
class Fin{

  constructor(bas = 30, typ = 3){
    this.TRAP_BASE_SCALE = 1;
    this.TRAP_HEIGHT_SCALE = 1;
    this.TRAP_THICKNESS_SCALE = 12;
    this.TRAP_MODEL = loadModel('assets/RightTrap.obj');
    this.ISORIGHT_BASE_SCALE = 5;
    this.ISORIGHT_THICKNESS_SCALE = 12;
    this.ISORIGHT_MODEL = loadModel('assets/454590.obj');
    this.NONISORIGHT_BASE_SCALE = 1;
    this.NONISORIGHT_THICKNESS_SCALE = 12;
    this.NONISORIGHT_MODEL = loadModel('assets/306090.obj');

    base = bas;
    thickness = 5;
    height = 20;
    fin_type = typ;
    this.toDraw = true;
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Trapezoidal', 1);
    this.dropdown.option('45-45-90 Triangles', 2);
    this.dropdown.option('30-60-90 Triangles', 3);
    this.dropdown.changed(function(e){ nose_type = this.value(); });
    this.inpB = createInput('');
    this.inpB.input(function(e){ if(!isNaN(this.value())){if(this.value() > 15 && this.value() <= 100){nose_height = this.value();}} });
    this.inpR = createInput('');
    this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){nose_radius = this.value(); body_radius = this.value();}} });
    this.font = loadFont('assets/Avenir.otf');

  }

  activate(){
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Conical', 1);
    this.dropdown.option('Elliptical', 2);
    this.dropdown.option('Ogive', 3);
    this.dropdown.changed(function(e){ nose_type = this.value(); });
    this.inpH = createInput('');
    this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 15 && this.value() <= 200){nose_height = this.value();}} });
    this.inpR = createInput('');
    this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){nose_radius = this.value(); body_radius = this.value();}} });
    this.makeGUI();
    this.isActive = true;
  }

  deactivate(){
    this.inpH.remove();
    this.inpR.remove();
    this.dropdown.remove();
    this.isActive = false;
  }


  setRadius(radius){
    nose_radius = radius;
  }

  setHeight(height){
    nose_height = height;
  }

  getRadius(){
    return radius;
  }

  getHeight(){
    return height;
  }

  makeGUI(){
    this.dropdown.position(50,100);
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
    text('Nose Cone Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(angle){
    if(!this.toDraw)
      return;
    if(fin_type == 1){
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      scale(this.TRAP_BASE_SCALE*base,this.TRAP_THICKNESS_SCALE*thickness,this.TRAP_HEIGHT_SCALE*height);
      model(this.TRAP_MODEL);
      pop();
    }
    else if(fin_type == 2){
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      scale(this.ISORIGHT_BASE_SCALE*base,this.ISORIGHT_THICKNESS_SCALE*thickness,this.ISORIGHT_BASE_SCALE*base);
      model(this.ISORIGHT_MODEL);
      pop();
    }
    else{
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      console.log('hi');
      console.log(this.NONISORIGHT_BASE_SCALE*base);
      scale(this.NONISORIGHT_BASE_SCALE*base,this.NONISORIGHT_THICKNESS_SCALE*thickness,this.NONISORIGHT_BASE_SCALE*base);
      model(this.NONISORIGHT_MODEL);
      pop();
    }


  }



}
