import scipy
import scipy.integrate
import numpy as np
import math
import matplotlib

def altitude(mass, a, thrust, t, cd):
    k = 0.5*1.2*cd*a
    g = 9.80665
    mg = g * mass
    q = ((thrust-mg)/k)**.5
    x = 2*k*q/mass
    v = q*(1-math.e**(-x*t))/(1+math.e**(-x*t))
    b = ((-1*mass)/(2*k))*np.log((thrust - mass*g - k*(v**2)) / (thrust - mass*g))
    c = (mass / (2*k))*np.log((mass*g + k*v**2) / (mass*g))

    p = -1.223
    burnvel = 213.4473 * (1-math.e**(p*t))/(1+math.e**(p*t))
    qa = ((mass * g)/k)**0.5
    qb = ((g *k )/mass)**0.5

    return np.arctan(burnvel/qa)/qb, b+c

def fall_v(mass, d):
    cd = 1.3
    r = 1.229
    pi = math.pi



    return ((8*mass*9.80665)/(pi*r*cd*(d**2)))**0.5

print("Rocket info: ")
m = float(input("mass (g): "))/1000
a = (float(input("outer diameter (mm): "))/2000)**2*math.pi
cone = input("nose cone type (ogive, cone, parabola): ")
if cone == "ogive":
    cd = 0.75
if cone == "cone":
    cd = 0.75*1.25
if cone == "parabola":
    cd = 0.75*1.10
#max_thrust = float(input("max thrust (N): "))
thrust = float(input("avg thrust (N): "))
impulse = float(input("thrust duration(s): "))
#wmass = float(input("gunpowder weight(g): "))/1000
#print("Parachute info: ")
rad = float(input("Parachute Diameter (cm): "))/100

ctime, apogee = altitude(m,a,thrust,impulse,cd)
free_v = fall_v(m, rad)
print("Apogee (m): " + str(apogee))
print("Fall average velocity (m/s): " + str(free_v))
print(str(impulse) + " seconds spent thrusting")
print(str(ctime) + " seconds spent coasting")
print(str(apogee/free_v) + " seconds spent falling")
print(str(impulse+ctime+apogee/free_v)+ " total seconds")
#loop1m = (m-wmass)/impulse
#loop2b = 2*thrust-max_thrust
#if loop2b < 0:
#    loop2b = 0.5
#loop2m = (max_thrust-loop2b)/impulse
#curr_v = 0.001
#i = 0
#total = 0
#inc = 0.05
#const = 0.6
#while i < 1:
#    const += 0.1
#    while curr_v > 0:
#        loop_mass = m-loop1m*i
#        loop_t = loop2m * i + loop2b
#        if i <= impulse:
#            drag = .75 * a * (curr_v**2)
#            curr_v += inc * (const*loop_t-m*9.8-drag)/(loop_mass*1.22)
#        else:
#            drag = .75 * 0.5 * a * (curr_v**2)
#            curr_v -= (9.8*inc+drag)
#        total+=curr_v
#        print("time " + str(i) + " seconds: " + str(curr_v) + " m/s")
#        i += inc
#        i = round(i, 3)
#    i = 0
#curr_v = 0
#while total > 0:
#print(total*inc)
