export const getAllAbilitiesFromItems = async (itemList) => {
    try {
        let allAbilities = new Set();

        itemList.forEach(item => {
            allAbilities.add(item.skill);
        });

        return Array.from(allAbilities);
    } catch (error) {
        console.error("Error in getAllAbilitiesFromItems:", error);
        throw new Error("Failed to get all abilities from items");
    }
}


export const countItemsFavoritesFromMissingCourses = async (itemName, itemList, coursesMissingList) => {
    try {
        let itemTrackCount = {
            name: "",
            count: 0,
            favorite_courses: []
        };

        let notCoveredCourses = new Set();
        const item = itemList.find(i => i.name.toLowerCase() == itemName.toLowerCase().trim());

        if (!item) {
            return null;
        }

        itemTrackCount.name = item.name;

        item.favorite_courses.forEach(course => {
            if (coursesMissingList.some(missingCourse => missingCourse === course)) {
                itemTrackCount.count += 1;
                notCoveredCourses.add(course);
            }
        });

        itemTrackCount.favorite_courses = Array.from(notCoveredCourses);
        return itemTrackCount;
    } catch (error) {
        console.error("Error in countItemsFavoritesFromMissingCourses:", error);
        throw new Error("Failed to count item favorites from missing courses");
    }
}


export const recommendItemsByCoverage = async (coursesMissingList, items, userItems) => {
    try {
        let itemTrackCount = [];

        userItems.forEach(userItem => {
            if (!userItem.owned) {
                const itemNotOwned = items.find(item => item.id === userItem.id);

                itemNotOwned.favorite_courses.forEach(course => {
                    let itemFound = itemTrackCount.find(savedItem => savedItem.name === itemNotOwned.name);

                    if (coursesMissingList.some(missingCourse => missingCourse === course)) {
                        if (!itemFound) {
                            itemTrackCount.push({ 
                                name: itemNotOwned.name, 
                                rarity: itemNotOwned.rarity, 
                                skill: itemNotOwned.skill,
                                count: 1
                            });
                        } else {
                            itemFound.count += 1;
                        }
                    }
                });
            }
        });

        itemTrackCount.sort((a, b) => b.count - a.count);

        return itemTrackCount;
    } catch (error) {
        console.error("Error in recommendItemsByCoverage:", error);
        throw new Error("Failed to recommend items by coverage");
    }
}


export const findCoursesWithoutCoverage = async (allCoursesList, coveredCoursesList) => {
    try {
        let coursesQTY = allCoursesList.length;
        let notCovCoursesQTY = coveredCoursesList.length;
        console.log("There are ", coursesQTY, " in total and you cover ", notCovCoursesQTY);
        console.log("You still have to cover ", coursesQTY - notCovCoursesQTY, " courses");
        let coursesNotCov = allCoursesList.filter(course => !coveredCoursesList.some(coveredCourse => coveredCourse === course));
        return coursesNotCov;
    } catch (error) {
        console.error("Error in findCoursesWithoutCoverage:", error);
        throw new Error("Failed to find courses without coverage");
    }
}


export const findCoursesWithCoverage = async (items, userItems) => {
    try {
        let coveredCourses = new Set();

        userItems.forEach(userItem => {
            if (userItem.owned) {
                const driver = items.find(i => i.id === userItem.id);
                if (driver) {
                    driver.favorite_courses.forEach(course => coveredCourses.add(course));
                }
            }
        });

        return Array.from(coveredCourses);
    } catch (error) {
        console.error("Error in findCoursesWithCoverage:", error);
        throw new Error("Failed to find courses with coverage");
    }
}

export const fetchUserDrivers = async () => {
    try {
        let driversList = await fetch('/python/example/MyDrivers.json');

        if (!driversList.ok) {
            throw new Error('Failed to fetch drivers');
        }

        let json_drivers = await driversList.json();
        return json_drivers;
    } catch (error) {
        console.error("Error while fetching drivers:", error);
        throw new Error("Failed to fetch user drivers");
    }
}

export const fetchUserKarts = async () => {
    try {
        let kartsList = await fetch('/python/example/MyKarts.json');

        if (!kartsList.ok) {
            throw new Error('Failed to fetch karts');
        }

        let json_karts = await kartsList.json();
        return json_karts;
    } catch (error) {
        console.error("Error while fetching karts:", error);
        throw new Error("Failed to fetch user karts");
    }
}

export const fetchUserGliders = async () => {
    try {
        let glidersList = await fetch('/python/example/MyGliders.json');

        if (!glidersList.ok) {
            throw new Error('Failed to fetch gliders');
        }

        let json_gliders = await glidersList.json();
        return json_gliders;
    } catch (error) {
        console.error("Error while fetching gliders:", error);
        throw new Error("Failed to fetch user gliders");
    }
}


