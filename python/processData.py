#This file will be to filter and processs data of drivers, karts and gliders.
#Shoutouts to "spinachpants" on reddit https://www.reddit.com/r/MarioKartTour/comments/11mg9t2/coverage_spreadsheet_updated_for_the_mario_tour/
#For making a spreadsheets for coverage and more
#I specifically used the "data" spreadhsheet and called MKT-data
#I also used the inventory and coverage to make csv files for the drivers, karts and gliders

import pandas as pd
import csv
import json


allDrivers = {}
allKarts = {}
allGliders = {}


df = pd.read_csv("MKT-DATA.csv")

#Top shelf coverage for drivers

# First we get all the drivers from the drivers csv and store them
# MKT-DATA contains all drivers, karts and gliders and their prefered courses, but it does not specify 
# the type of each

dfDrivers =  pd.read_csv("MKT-Drivers.csv")
for index, row in dfDrivers.iterrows():
    allDrivers[ row["driver"] ] = { 'skill': row["skill"], 'rarity': row['rarity']}

print(allDrivers['Pauline'])


# Getting all the available karts in the game
dfKarts =  pd.read_csv("MKT-Karts.csv")
for index, row in dfKarts.iterrows():
    allKarts[ row["kart"] ] = { 'skill': row["skill"], 'rarity': row['rarity']}

# Getting all the available gliders in the game
dfGliders =  pd.read_csv("MKT-Gliders.csv")
for index, row in dfGliders.iterrows():
    allGliders[ row["glider"] ] = { 'skill': row["skill"], 'rarity': row['rarity']}


df_filtered = df.dropna(subset=['Top Shelf'])

#Now we get the favorite courses of each driver
for index, row in df_filtered.iterrows():
    
    itemName = row['Name']
    
    #Checking if the current item is a driver
    if itemName in allDrivers.keys():
        # Initializing the favorite_courses list if not already present
        if 'favorite_courses' not in allDrivers[itemName]:
            allDrivers[itemName]['favorite_courses'] = []
        
        # Append the 'Top Shelf' course to the favorite_courses list
        allDrivers[itemName]['favorite_courses'].append(row["Top Shelf"])

    elif itemName in allKarts.keys():
        if 'favorite_courses' not in allKarts[itemName]:
            allKarts[itemName]['favorite_courses'] = []
        
        # Append the 'Top Shelf' course to the favorite_courses list
        allKarts[itemName]['favorite_courses'].append(row["Top Shelf"])
    
    else:
        if 'favorite_courses' not in allGliders[itemName]:
            allGliders[itemName]['favorite_courses'] = []
        
        # Append the 'Top Shelf' course to the favorite_courses list
        allGliders[itemName]['favorite_courses'].append(row["Top Shelf"])


print(allDrivers['Pauline'])

print(len(allDrivers['Pauline']['favorite_courses']))

with open("drivers_data.json", "w") as outfile:
    json.dump(allDrivers, outfile)

with open("karts_data.json", "w") as outfile:
    json.dump(allKarts, outfile)

with open("gliders_data.json", "w") as outfile:
    json.dump(allGliders, outfile)