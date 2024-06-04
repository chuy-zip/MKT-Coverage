import pandas as pd
import json
import os

# Initialize dictionaries
allDrivers = {}
allKarts = {}
allGliders = {}
allCourses = { 'courses': []}

# Load data
df = pd.read_csv("MKT-DATA.csv")
dfDrivers = pd.read_csv("MKT-Drivers.csv")
dfKarts = pd.read_csv("MKT-Karts.csv")
dfGliders = pd.read_csv("MKT-Gliders.csv")
dfCourses = pd.read_csv("MKT-Courses.csv")

print(dfCourses.head(5))
print(allCourses['courses'])

# Populate drivers dictionary
for _, row in dfDrivers.iterrows():
    allDrivers[row["driver"]] = {'skill': row["skill"], 'rarity': row['rarity']}

# Populate karts dictionary
for _, row in dfKarts.iterrows():
    allKarts[row["kart"]] = {'skill': row["skill"], 'rarity': row['rarity']}

# Populate gliders dictionary
for _, row in dfGliders.iterrows():
    allGliders[row["glider"]] = {'skill': row["skill"], 'rarity': row['rarity']}

# Populate courses dictionary
for _, row in dfCourses.iterrows():
    if row['course'] not in allCourses['courses']:
        allCourses['courses'].append(row['course'])

# Filter rows with non-null 'Top Shelf'
df_filtered = df.dropna(subset=['Top Shelf'])

# Update dictionaries with favorite courses
for _, row in df_filtered.iterrows():
    itemName = row['Name']
    favorite_course = row['Top Shelf']
    
    if itemName in allDrivers:
        allDrivers[itemName].setdefault('favorite_courses', []).append(favorite_course)
    elif itemName in allKarts:
        allKarts[itemName].setdefault('favorite_courses', []).append(favorite_course)
    else:
        allGliders[itemName].setdefault('favorite_courses', []).append(favorite_course)

# Debug information
print(allDrivers['Pauline'])
print(len(allDrivers['Pauline']['favorite_courses']))

# Save to JSON files
with open("drivers_data.json", "w") as outfile:
    json.dump(allDrivers, outfile, indent=4)

with open("karts_data.json", "w") as outfile:
    json.dump(allKarts, outfile, indent=4)

with open("gliders_data.json", "w") as outfile:
    json.dump(allGliders, outfile, indent=4)

with open("courses_data.json", "w") as outfile:
    json.dump(allCourses, outfile, indent=4)



###############
#The next code is for processingData of an account

output_directory = "example"
os.makedirs(output_directory, exist_ok=True)

myData = {
    'drivers' : {},
    'karts': {},
    'gliders': {}
}

dfMydata = pd.read_csv("example/MKT-MyData.csv")

for _, row in dfMydata.iterrows():

    itemName = row["item"]

    if itemName in allDrivers:
        myData['drivers'][itemName] = row["owned"]

    elif itemName in allKarts:
        myData['karts'][itemName] = row['owned']

    else:
        myData['gliders'][itemName] = row['owned']


with open(os.path.join(output_directory, "MyDrivers.json"), "w") as outfile:
    json.dump(myData['drivers'], outfile, indent=4)

with open(os.path.join(output_directory, "MyKarts.json"), "w") as outfile:
    json.dump(myData['karts'], outfile, indent=4)

with open(os.path.join(output_directory, "MyGliders.json"), "w") as outfile:
    json.dump(myData['gliders'], outfile, indent=4)