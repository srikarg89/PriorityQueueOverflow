import scipy
import scipy.integrate
import numpy as np
#
def altitude(mass, a, thrust, thrust_dur):
    k = 0.5*1.2*0.75*a
    mg = 9.80665 * mass
    q = (thrust-mg)**.5
    x = 2*k*q/mass
    v = q*(1-math.e**(-x*t))/(1+math.e**exp(-x*t))
    b = (-1*M / (2*k))*np.log((T - M*g - k*v**2) / (T - M*g))
    c = (M / (2*k))*np.log((M*g + k*v**2) / (M*g))
    return b+c

m = float(input("mass (g): "))/1000
a = (float(input("outer diameter (mm): "))*500)**2*math.pi
thrust = float(input("thrust (N): "))
impulse = float(input("thrust duration(s): "))
print(str(altitude(m,a,thrust,impulse)))
