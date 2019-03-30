var motor_type;
class Motor{

  constructor(){
    this.makeDropdown();
    this.DIAMETER_SCALE = 1.5;
    this.HEIGHT_SCALE = .75;

    this.curr = MOTORDATA[this.dropdown.elt.value];
    this.diameter = this.curr["diameter"];
    this.height = this.curr["length"];
    this.toDraw = true;
    this.font = loadFont('assets/Avenir.otf');
    this.makeDelayDropdown();
  }

  makeDelayDropdown(){
    this.delay_dropdown = createSelect();
    for(let x = 0; x < this.curr["delay"].length; x++){
      this.delay_dropdown.option(this.curr["delay"][x] + " seconds",this.curr["delay"][x]);
    }
  }

  makeDropdown(){
    this.dropdown = createSelect(); // or create dropdown?
//    this.dropdown.option('Estes_F39-9', 'Estes_F39-9');
    this.dropdown.option('Estes 1/4A3T','Estes_1/4A3T');
    this.dropdown.option('Estes 1/2A3T','Estes_1/2A3T');
    this.dropdown.option('Estes 1/2A6','Estes_1/2A6');
    this.dropdown.option('Estes A3T','Estes_A3T');
    this.dropdown.option('Estes A8','Estes_A8');
    this.dropdown.option('Estes A10T','Estes_A10T');
    this.dropdown.option('Estes B4','Estes_B4');
    this.dropdown.option('Estes C5','Estes_C5');
    this.dropdown.option('Estes C6','Estes_C6');
    this.dropdown.option('Estes C11','Estes_C11');
    this.dropdown.option('Estes D11','Estes_D11');
    this.dropdown.option('Estes D12','Estes_D12');
    this.dropdown.option('HyperTek I130','HyperTek_I130');
    this.dropdown.option('Hypertek I136','Hypertek_I136');
    this.dropdown.option('Hypertek I145','Hypertek_I145');
    this.dropdown.option('HyperTek I205','HyperTek_I205');
    this.dropdown.option('Hypertek I222','Hypertek_I222');
    this.dropdown.option('Hypertek I225','Hypertek_I225');
    this.dropdown.option('Hypertek I260','Hypertek_I260');
    this.dropdown.option('Kosdon-by-Aerotech I170S','Kosdon-by-Aerotech_I170S');
    this.dropdown.option('Kosdon-by-AeroTech I280F','Kosdon-by-AeroTech_I280F');
    this.dropdown.option('Kosdon-by-AeroTech I310S','Kosdon-by-AeroTech_I310S');
    this.dropdown.option('Kosdon-by-AeroTech I370F','Kosdon-by-AeroTech_I370F');
    this.dropdown.option('Kosdon-by-AeroTech I450F','Kosdon-by-AeroTech_I450F');
    this.dropdown.option('Loki H500','Loki_H500');
    this.dropdown.option('Propulsion-Polymers H70','Propulsion-Polymers_H70');
    this.dropdown.option('Propulsion-Polymers I80','Propulsion-Polymers_I80');
    this.dropdown.option('Propulsion-Polymers I160','Propulsion-Polymers_I160');
    this.dropdown.option('Quest A6Q','Quest_A6Q');
    this.dropdown.option('Quest B6Q','Quest_B6Q');
    this.checkDisabled();
  }

  activate(){
    if(!this.isActive){
      this.dropdown.elt.hidden = false;
      this.makeGUI();
      this.isActive = true;
      this.delay_dropdown.elt.hidden = false;
    }
  }

  deactivate(){
    this.dropdown.elt.hidden = true;
    this.delay_dropdown.elt.hidden = true;
    this.isActive = false;
  }

  makeGUI(){
    this.dropdown.position(250,100);
    this.delay_dropdown.position(250,200);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);
    text('Motor options:',-width/2 + 125,-height/2 + 98, 500,100);
    text('Delay options:',-width/2 + 125,-height/2 + 199, 500,100);

    textSize(20);
    text('Choosing a motor',-width/2 + 200,-height/2 + 30, 500,100);
  }

  checkDisabled(){
    for(let i = 0; i < this.dropdown.width; i++){
      let opt = this.dropdown.elt[i];
      if(this.diameter * this.DIAMETER_SCALE > body.diameter*body.DIAMETER_SCALE * 3/4){
        opt.disabled = true;
      }
      else{
        opt.disabled = false;
      }
    }
  }

  draw(body_height){
    if(!this.toDraw)
      return;

    let temp = MOTORDATA[this.dropdown.elt.value];
    if(temp != this.curr){
      this.curr = temp;
      this.makeDelayDropdown();
    }
    this.curr = temp;
    this.checkDisabled();
//    console.log(this.dropdown.elt.value);
//    console.log(this.curr);
    this.diameter = this.curr["diameter"];
    this.height = this.curr["length"];
    push();
    translate(0,-body_height);
//    console.log(body_height);
    fill(0,0,0);
    cylinder(this.diameter*this.DIAMETER_SCALE/2, this.height*this.HEIGHT_SCALE);
    pop();

  }



}
