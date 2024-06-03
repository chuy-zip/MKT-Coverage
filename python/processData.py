#This file will be to filter and processs data of drivers, karts and gliders.
#Shoutouts to "spinachpants" on reddit https://www.reddit.com/r/MarioKartTour/comments/11mg9t2/coverage_spreadsheet_updated_for_the_mario_tour/
#For making a spreadsheets for coverage and more
# I specifically used the "data" spreadhsheet an called MKT-data

import pandas as pd
import csv
import json


allDrivers = {}
allKarts = {}
allGlideres = {}

itemsPreffered = {
    'drivers': {},
    'karts': {},
    'gliders': {}

}

df = pd.read_csv("MKT-DATA.csv")

#Top shelf coverage for drivers

# First we get all the drivers from the drivers csv and store them
# MKT-DATA contains all drivers, karts and gliders and their prefered courses, but it does not specify 
# the type of each

dfDrivers =  pd.read_csv("MKT-Drivers.csv")
print(dfDrivers.head(5))

for index, row in dfDrivers.iterrows():
    allDrivers[ row["driver"] ] = { 'skill': row["skill"], 'rarity': row['rarity']}

print(allDrivers['Pauline'])

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

print(allDrivers['Pauline'])

print(len(allDrivers['Pauline']['favorite_courses']))

with open("drivers_data.json", "w") as outfile:
    json.dump(allDrivers, outfile)