import pandas as pd
import json
import os

def add_favorite_course_to_item(item_name, item_list, favorite_course):
    for item in item_list:
        if item['name'] == item_name:
            item.setdefault('favorite_courses', []).append(favorite_course)
            return True
    return False

def mark_item_ownership(item_name, item_list, my_data, index, item_type, owned):
    for item in item_list:
        if item["name"] == item_name:
            my_data[item_type].append({'id': index + 1, 'name': item_name, 'type': item_type[:-1], 'owned': owned})
            return True
    return False

def generate_json_for_list(output_directory, file_name, data_list):
    path = os.path.join(output_directory, file_name) if output_directory else file_name
    with open(path, "w") as outfile:
        json.dump(data_list, outfile, indent=4)

def populate_initial_list(df, data_list, item_type, start_id):
    for _, row in df.iterrows():
        data_list.append({'id': start_id, 'name': row[item_type], 'type': item_type, 'skill': row["skill"], 'rarity': row['rarity']})
        start_id += 1
    return start_id

# Initialize lists
all_drivers, all_karts, all_gliders, all_courses = [], [], [], []

# Load data
df = pd.read_csv("MKT-DATA.csv")
df_drivers = pd.read_csv("MKT-Drivers.csv")
df_karts = pd.read_csv("MKT-Karts.csv")
df_gliders = pd.read_csv("MKT-Gliders.csv")
df_courses = pd.read_csv("MKT-Courses.csv")

# Populate initial lists
next_id = 1
next_id = populate_initial_list(df_drivers, all_drivers, 'driver', next_id)
next_id = populate_initial_list(df_karts, all_karts, 'kart', next_id)
populate_initial_list(df_gliders, all_gliders, 'glider', next_id)

# Populate courses list
all_courses = df_courses['course'].unique().tolist()

# Filter rows with non-null 'Top Shelf'
df_filtered = df.dropna(subset=['Top Shelf'])

# Update items with favorite courses
for _, row in df_filtered.iterrows():
    item_name = row['Name']
    favorite_course = row['Top Shelf']
    if not add_favorite_course_to_item(item_name, all_drivers, favorite_course):
        if not add_favorite_course_to_item(item_name, all_karts, favorite_course):
            add_favorite_course_to_item(item_name, all_gliders, favorite_course)

# Debug information
print(all_drivers[4])
print(all_drivers[4]['favorite_courses'])
print(len(all_drivers[4]['favorite_courses']))

# Save to JSON files
generate_json_for_list('', "drivers_data.json", all_drivers)
generate_json_for_list('', "karts_data.json", all_karts)
generate_json_for_list('', "gliders_data.json", all_gliders)
generate_json_for_list('', "courses_data.json", all_courses)

# Processing account data
output_directory = "example"
os.makedirs(output_directory, exist_ok=True)

my_data = {'drivers': [], 'karts': [], 'gliders': []}
df_mydata = pd.read_csv("example/MKT-MyData.csv")

for index, row in df_mydata.iterrows():
    item_name = row["item"]
    owned = row['owned']
    if not mark_item_ownership(item_name, all_drivers, my_data, index, 'drivers', owned):
        if not mark_item_ownership(item_name, all_karts, my_data, index, 'karts', owned):
            mark_item_ownership(item_name, all_gliders, my_data, index, 'gliders', owned)

# Save account data to JSON files
generate_json_for_list(output_directory, "MyDrivers.json", my_data['drivers'])
generate_json_for_list(output_directory, "MyKarts.json", my_data['karts'])
generate_json_for_list(output_directory, "MyGliders.json", my_data['gliders'])
