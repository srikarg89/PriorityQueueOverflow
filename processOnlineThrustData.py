import requests
import json
import os

URL = "http://www.thrustcurve.org/download.jsp?id=1247"
END = "http://www.thrustcurve.org/simfilesearch.jsp?id=1290"

num = 1247
DIR = "Motors"
all_motors = {}
while num <= 1290:
    print(num)
    URL = "http://www.thrustcurve.org/download.jsp?id="+str(num)
    r = requests.get(url = URL, params = {})

    string = r.text
    while ';' in string:
        string = string[string.index('\n')+1:]

    lines = string.strip().split('\n')
    lines[0] = lines[0].strip().split(' ')
    model = lines[0][0].strip()
    diameter = float(lines[0][1]) #mm
    length = float(lines[0][2]) #mm
    delaytimes = [int(i) for i in lines[0][3].split('-')]
    propWeight = float(lines[0][4]) #kg
    totalWeight = float(lines[0][5]) #kg
    company = lines[0][6].strip()
    '''
print("Model:",model)
print("Diameter:",diameter)
print("Length:",length)
print("Delay times:",delaytimes)
print("Propellant weight:",propWeight)
print("Total weight:",totalWeight)
print("Company:",company)
    '''

    points = []
    for i in range(len(lines)-1):
        line = lines[i+1].strip().split(' ')
        time = float(line[0].strip())
        thrust = float(line[1].strip())
        points.append((time,thrust))

#print(points)

    motor = {}
    motor['model'] = model
    motor['diameter'] = diameter
    motor['length'] = length
    motor['delay'] = delaytimes
    motor['pweight'] = propWeight
    motor['tweight'] = totalWeight
    motor['company'] = company
    motor['points'] = points
    all_motors[company+'_'+model] = motor
    num += 1

#print(motor)
filename = 'C:/Users/Srikar/Documents/PriorityQueueOverflow/MOTOR_DATA.json'
dirname = os.path.dirname(filename)
if not os.path.exists(dirname):
    os.makedirs(dirname)
with open(filename, 'w') as outfile:
    json.dump(all_motors, outfile)
