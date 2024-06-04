import pandas as pd
import json
import os

def addFavoriteCourseToItem(itemName, itemList, favorite_course):
    for item in itemList:
        if item['name'] == itemName:
            item.setdefault('favorite_courses', []).append(favorite_course)
            return True
        
def markItemOwnership(itemName, itemList, myData, index, type, owned):
    for item in itemList:
        if item["name"] == itemName:
            Ntype = type[:-1]
            myData[type].append( {'id': index + 1, 'name': itemName, 'type': Ntype, 'owned': owned} )
            return True
    
    return False
        
# Initialize dictionaries
allDrivers = []
allKarts = []
allGliders = []
allCourses = { 'courses': []}

# Load data
df = pd.read_csv("MKT-DATA.csv")
dfDrivers = pd.read_csv("MKT-Drivers.csv")
dfKarts = pd.read_csv("MKT-Karts.csv")
dfGliders = pd.read_csv("MKT-Gliders.csv")
dfCourses = pd.read_csv("MKT-Courses.csv")

print(dfCourses.head(5))
print(allCourses['courses'])

id = 1
# Populate drivers dictionary
for _, row in dfDrivers.iterrows():
    allDrivers.append({'id': id, 'name': row["driver"], 'type':'driver','skill': row["skill"], 'rarity': row['rarity']})
    id = id + 1

# Populate gliders dictionary
for _, row in dfKarts.iterrows():
    allKarts.append({'id': id, 'name': row["kart"], 'type':'kart', 'skill': row["skill"], 'rarity': row['rarity']})
    id = id + 1

# Populate karts dictionary
for _, row in dfGliders.iterrows():
    allGliders.append({'id': id, 'name': row["glider"], 'type':'glider', 'skill': row["skill"], 'rarity': row['rarity']})
    id = id + 1


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
    
    if not addFavoriteCourseToItem(itemName, allDrivers, favorite_course):
        
        if not addFavoriteCourseToItem(itemName, allKarts,favorite_course):

            addFavoriteCourseToItem(itemName, allGliders, favorite_course)

# Debug information
print(allDrivers[4])
print(len(allDrivers[4]['favorite_courses']))

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
#The next code is for processing Data of an account

output_directory = "example"
os.makedirs(output_directory, exist_ok=True)

myData = {
    'drivers' : [],
    'karts': [],
    'gliders': []
}

dfMydata = pd.read_csv("example/MKT-MyData.csv")

for index, row in dfMydata.iterrows():

    itemName = row["item"]
    owned= row['owned']

    if not markItemOwnership(itemName, allDrivers, myData, index, 'drivers', owned):

        if not markItemOwnership(itemName, allKarts, myData, index, 'karts', owned):

            markItemOwnership(itemName, allGliders, myData, index, 'gliders', owned)
        

with open(os.path.join(output_directory, "MyDrivers.json"), "w") as outfile:
    json.dump(myData['drivers'], outfile, indent=4)

with open(os.path.join(output_directory, "MyKarts.json"), "w") as outfile:
    json.dump(myData['karts'], outfile, indent=4)

with open(os.path.join(output_directory, "MyGliders.json"), "w") as outfile:
    json.dump(myData['gliders'], outfile, indent=4)