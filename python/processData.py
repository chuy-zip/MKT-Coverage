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
    
def generateJsonForList(output_directory, fileName, list):
    if output_directory == '':
        with open(fileName, "w") as outfile:
            json.dump(list, outfile, indent=4)
    else:  
        with open(os.path.join(output_directory, fileName), "w") as outfile:
            json.dump(list, outfile, indent=4)

def populateInitialList(df, list, type, id):
    for _, row in df.iterrows():
        list.append({'id': id, 'name': row[type], 'type':type,'skill': row["skill"], 'rarity': row['rarity']})
        id = id + 1

    return id

# Initialize dictionaries
allDrivers = []
allKarts = []
allGliders = []
allCourses = []

# Load data
df = pd.read_csv("MKT-DATA.csv")
dfDrivers = pd.read_csv("MKT-Drivers.csv")
dfKarts = pd.read_csv("MKT-Karts.csv")
dfGliders = pd.read_csv("MKT-Gliders.csv")
dfCourses = pd.read_csv("MKT-Courses.csv")

print(dfCourses.head(5))
print(allCourses)

id = 1
id = populateInitialList(dfDrivers, allDrivers, 'driver', id)
id = populateInitialList(dfKarts, allKarts, 'kart', id)
populateInitialList(dfGliders, allGliders, 'glider', id)

# Populate courses dictionary
for _, row in dfCourses.iterrows():
    if row['course'] not in allCourses:
        allCourses.append(row['course'])

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
print(allDrivers[4]['favorite_courses'])
print(len(allDrivers[4]['favorite_courses']))

# Save to JSON files
generateJsonForList('', "drivers_data.json", allDrivers)
generateJsonForList('', "karts_data.json", allKarts)
generateJsonForList('', "gliders_data.json", allGliders)
generateJsonForList('', "courses_data.json", allCourses)

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

# Generating more json
generateJsonForList(output_directory, "MyDrivers.json", myData['drivers'])
generateJsonForList(output_directory, "MyKarts.json", myData['karts'])
generateJsonForList(output_directory, "MyGliders.json", myData['gliders'])