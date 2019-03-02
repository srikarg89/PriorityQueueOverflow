import scipy
import scipy.integrate
import numpy as np
import math
def altitude(mass, a, thrust, t):
    k = 0.5*1.2*0.75*a
    g = 9.80665
    mg = g * mass
    q = ((thrust-mg)/k)**.5
    x = 2*k*q/mass
    v = q*(1-math.e**(-x*t))/(1+math.e**(-x*t))
    b = ((-1*mass)/(2*k))*np.log((thrust - mass*g - k*(v**2)) / (thrust - mass*g))
    print(b)
    c = (mass / (2*k))*np.log((mass*g + k*v**2) / (mass*g))
    return b+c

m = float(input("mass (g): "))/1000
a = (float(input("outer diameter (mm): "))/2000)**2*math.pi
thrust = float(input("thrust (N): "))
impulse = float(input("thrust duration(s): "))
print("Apogee (m): " + str(altitude(m,a,thrust,impulse)))
