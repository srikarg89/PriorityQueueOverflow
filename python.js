function altitude(mass, a, thrust, t, cd){
  k = 0.5*1.2*cd*a
  g = 9.80665
  mg = g * mass
  q = Math.pow(((thrust-mg)/k),.5)
  x = 2*k*q/mass
  v = q*(1-Math.pow(Math.E,(-x*t))/(1+Math.E**(-x*t)))
  b = ((-1*mass)/(2*k))*Math.log((thrust - mass*g - k*(v**2)) / (thrust - mass*g))
  c = (mass / (2*k))*Math.log((mass*g + k*v**2) / (mass*g))

  p = -1.223
  burnvel = 213.4473 * (1-Math.E**(p*t))/(1+Math.E**(p*t))
  qa = Math.pow(((mass * g)/k),0.5)
  qb = Math.pow(((g * k)/mass),0.5)

  return [Math.atan(burnvel/qa)/qb, b+c]
}
function fall_v(mass, d){
    cd = 1.3
    r = 1.229
    pi = Math.PI

    return Math.pow(((8*mass*9.80665)/(pi*r*cd*(d**2))),0.5)
}

console.log(altitude(0.053, .0127, 6, 1.25, 0.75));
