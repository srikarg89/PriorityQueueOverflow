import requests
URL = "http://www.thrustcurve.org/download.jsp?id=1247"

r = requests.get(url = URL, params = {})

string = r.text
while ';' in string:
    string = string[string.index('\n')+1:]

print(string)
lines = string.strip().split('\n')
lines[0] = lines[0].strip().split(' ')
model = lines[0][0].strip()
diameter = int(lines[0][1]) #mm
length = int(lines[0][2]) #mm
delaytimes = [int(i) for i in lines[0][3].split('-')]
propWeight = float(lines[0][4]) #kg
totalWeight = float(lines[0][5]) #kg
company = lines[0][6].strip()

print("Model:",model)
print("Diameter:",diameter)
print("Length:",length)
print("Delay times:",delaytimes)
print("Propellant weight:",propWeight)
print("Total weight:",totalWeight)
print("Company:",company)

points = []
for i in range(len(lines)-1):
    line = lines[i+1].strip().split(' ')
    time = float(line[0].strip())
    thrust = float(line[1].strip())
    points.append((time,thrust))

print(points)
