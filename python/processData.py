import pandas as pd
import json

# Initialize dictionaries
allDrivers = {}
allKarts = {}
allGliders = {}

# Load data
df = pd.read_csv("MKT-DATA.csv")
dfDrivers = pd.read_csv("MKT-Drivers.csv")
dfKarts = pd.read_csv("MKT-Karts.csv")
dfGliders = pd.read_csv("MKT-Gliders.csv")

# Populate drivers dictionary
for _, row in dfDrivers.iterrows():
    allDrivers[row["driver"]] = {'skill': row["skill"], 'rarity': row['rarity']}

# Populate karts dictionary
for _, row in dfKarts.iterrows():
    allKarts[row["kart"]] = {'skill': row["skill"], 'rarity': row['rarity']}

# Populate gliders dictionary
for _, row in dfGliders.iterrows():
    allGliders[row["glider"]] = {'skill': row["skill"], 'rarity': row['rarity']}

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
