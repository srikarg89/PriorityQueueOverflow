var motor_type;
class Motor{

  constructor(){
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('F39-9', 1);
    this.dropdown.option('C6-9', 2);
    this.diameter_SCALE = 10;
    this.HEIGHT_SCALE = 10;
    this.diameters = [5,3];
    this.heights = [5,5];
    this.diameter = this.diameters[0];
    this.height = this.heights[0];
    this.type = 1;
    this.toDraw = true;
    this.font = loadFont('assets/Avenir.otf');
    this.SPECS = [[39,1.33,50],[6,1.9,14]]
  }

  activate(){
    if(!this.isActive){
      this.dropdown = createSelect(); // or create dropdown?
      this.dropdown.option('F39-9', 1);
      this.dropdown.option('C6-9', 2);
      this.dropdown.changed(function(e){ motor_type = this.value(); });
      this.makeGUI();
      this.isActive = true;
    }
  }

  deactivate(){
    this.dropdown.remove();
    this.isActive = false;
  }

  makeGUI(){
    this.dropdown.position(250,100);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);
    text('Motor options:',-windowWidth/2 + 140,-windowHeight/2 + 88, 500,100);

    textSize(20);
    text('Choosing a motor',-windowWidth/2 + 150,-windowHeight/2 + 30, 500,100);
  }

  draw(body_height){
    if(!this.toDraw)
      return;

    this.type = parseInt(this.dropdown.elt.value);
    this.diameter = this.diameters[this.type-1];
    this.height = this.heights[this.type-1];
    push();
    translate(0,-body_height);
    console.log(body_height);
    fill(0,0,0);
    cylinder(this.diameter*this.diameter_SCALE/2, this.height*this.HEIGHT_SCALE);
    pop();

  }



}
