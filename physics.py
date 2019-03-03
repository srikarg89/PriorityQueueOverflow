import scipy
import scipy.integrate
import numpy as np
import math
import matplotlib

def altitude(mass, a, thrust, t):
    k = 0.5*1.2*0.75*a
    g = 9.80665
    mg = g * mass
    q = ((thrust-mg)/k)**.5
    x = 2*k*q/mass
    v = q*(1-math.e**(-x*t))/(1+math.e**(-x*t))
    b = ((-1*mass)/(2*k))*np.log((thrust - mass*g - k*(v**2)) / (thrust - mass*g))
    c = (mass / (2*k))*np.log((mass*g + k*v**2) / (mass*g))
    return b+c

def fall_v(mass, a):
    cd = 1.75
    r = 1.229
    return ((2 * mass) / (cd * r * a))**0.5

print("Rocket info: ")
m = float(input("mass (g): "))/1000
a = (float(input("outer diameter (mm): "))/2000)**2*math.pi
max_thrust = float(input("max thrust (N): "))
thrust = float(input("avg thrust (N): "))
impulse = float(input("thrust duration(s): "))
wmass = float(input("gunpowder weight(g): "))/1000
#print("Parachute info: ")
#rad = float(input("Radius (cm): "))/10
#type = input("Hex or Round? ")
#if type == "Hex":
#    rads = math.pi/6
#    cotangent = (math.cos(rads))/(math.sin(rads))
#    p_a = 2*r/cotangent
#if type == "Round":
#    p_a = math.pi * rad**2
#apogee = altitude(m,a,thrust,impulse)
#free_v = fall_v(m, p_a)
#print("Apogee (m): " + str(apogee))
#print("Fall average velocity (m/s): " + str(free_v))
#print(str(impulse) + " seconds spent thrusting")
#print(str(apogee/free_v) + " seconds spent falling")

loop1m = (m-wmass)/impulse
loop2b = 2*thrust-max_thrust
loop2m = (max_thrust-loop2b)/impulse
curr_v = 0.001
i = 0
total = 0
inc = 0.1
while curr_v > 0:
    loop_mass = m-loop1m*i
    loop_t = loop2m * i + loop2b
    if i < inc*3:
        curr_v += inc * (loop_t-loop_mass*9.8)/loop_mass
    elif i <= impulse:
        drag = .75 * a * (curr_v**2)
        curr_v += inc * (loop_t-loop_mass*9.8-drag)/loop_mass
    else:
        curr_v -= 9.8 * inc +drag
    total+=curr_v
    print("time " + str(i) + " seconds: " + str(curr_v) + " m/s")
    i += inc
    i = round(i, 3)
print(total*inc)
