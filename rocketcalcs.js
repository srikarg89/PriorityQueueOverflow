var dt = 0.001;

//Constants: rho = air density,
var rho = 1.2;
var g = 9.81;
var MOTOR_MODELS = MOTORDATA;

//Rocket Features

//RocketMime's terms
/*
let k = 0.5 * rho * Cd * A
let Mg = M*g
let q = math.sqrt((T - Mg) / k)
let x = 2 * k * q / M
console.log(k,Mg,q,x)
console.log(q * math.exp(-1*x*t))

//Calculations: v = max velocity, ya = apogee, yb = boost distance, yc = coast distance
v = q * (1-math.exp(-1*x*t)) / (1+math.exp(-1*x*t))
console.log((k*pow(v,2)))
yb = (-1*M/(2*k))*math.log((T-Mg-k*pow(v,2))/(T-Mg))
yc = (M/(2*k))*math.log((Mg+k*pow(v,2))/(Mg))

console.log("Using equations that people made:")
console.log("Max velocity: ",v)
console.log("Boost distance: ",yb)
console.log("Coast distance: ",yc)
console.log("Apogee: ", yb+yc)

console.log('----------')
*/
//Return: Array of times, array of altitudes, array of velocities
function getCalcs(motor_name,mass,radius,rocket_drag = 0.75, parachute_radius = 0.125, parachute_drag = 1.75){ //Units: Mass - kg, Radius - meter
  let motor = MOTOR_MODELS[motor_name]
  let mpoints = motor['points'];
  let M1 = mass/1000 + motor['tweight'] - motor['pweight'];
  let M2 = motor['pweight'];
  let M = M1+M2;
  let A = Math.pow(radius,2)*Math.PI;
  let Ap = Math.pow(parachute_radius,2)*Math.PI;
  let Cd = rocket_drag;
  let Cdp = parachute_drag;
  let t = mpoints[mpoints.length-1][0];
  mpoints.push([t,0]);
  let delay = motor['delay'][2];

  let altitude = 0;
  let velocity = 0;
  let acceleration = 0;
  let steps = parseInt(t/dt);
  console.log(steps);
  let time = 0;

  //Arrays to store simulation
  let times = [];
  let altitudes = [];
  let velocities = [];

  //Motor points
  console.log(mpoints);
  let cindex = 0;
  let cslope = (mpoints[cindex+1][1]-mpoints[cindex][1])/(mpoints[cindex+1][0]-mpoints[cindex][0]);
  let totalT = 0;
  for(let i = 0; i < steps; i++){
      time += dt;
      if(time > mpoints[cindex+1][0]){
          cindex += 1;
          cslope = (mpoints[cindex+1][1]-mpoints[cindex][1])/(mpoints[cindex+1][0]-mpoints[cindex][0]);
          console.log(mpoints[cindex][0]);
      }
      let T = cslope*(time - mpoints[cindex][0]) + mpoints[cindex][1];
      totalT += T*dt;
  //    console.log(T)
      let D = (1/2) * rho * Cd * A * velocity * velocity;
      acceleration = (T - D - (M*g))/M;
      velocity += acceleration * dt;
      M -= (M2/steps);
      altitude += velocity * dt;
      times.push(time);
      altitudes.push(altitude);
      velocities.push(velocity);
  }
  while(time < t + delay){
      time += dt;
      D = (1/2) * rho * Cd * A * velocity * velocity;
      acceleration = (- D - (M*g))/M;
      velocity += acceleration * dt;
      altitude += velocity * dt;

      times.push(time);
      altitudes.push(altitude);
      velocities.push(velocity);
  }
  let termV = Math.sqrt((2*M)/(rho*Ap*Cdp));
  while(altitude > 0){
      time += dt;
      D = (1/2) * rho * Cdp * Ap * velocity * velocity;
      if (velocity > 0){
          D *= -1;
      }
      acceleration = (D - (M*g))/M;
      velocity += acceleration * dt;
      altitude += velocity * dt;

      times.push(time);
      altitudes.push(altitude);
      velocities.push(velocity);
  }
  return [times, altitudes, velocities];
}
