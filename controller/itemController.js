
export const countItemsFavoritesFromMissingCourses = async (itemName, itemList, coursesMissingList) => {
    let itemTrackCount = {
        name: itemName,
        count: 0
    }

    const item = itemList.find(i => i.name == itemName)

    item.favorite_courses.forEach(course => {
        if(coursesMissingList.some(missingCourse => missingCourse === course)){
            itemTrackCount.count += 1
        }
    })

    return itemTrackCount
}

export const recommendItemsByCoverage = async (coursesMissingList, items, userItems) => {

    let itemTrackCount = {}

    // I iterate through every userItems m
    userItems.forEach(userItem => {

        // I'm looking to recommend drivers that the user does not posses
        if (!userItem.owned) {
            const itemNotOwned = items.find(item => item.id === userItem.id)
            const itemName = itemNotOwned.name

            // Iterate through the favorite courses of the drivers that are not owned
            itemNotOwned.favorite_courses.forEach(course => {

                // Here I find and count each time a not owned driver has a missinCourse as a favorite course
                if (coursesMissingList.some(missingCourse => missingCourse === course)) {

                    if (!itemTrackCount[itemName]) {
                        itemTrackCount[itemName] = 0
                    }
                    itemTrackCount[itemName] += 1
                }
            })
        }
    })

    //sorting the results band converting the object into an array of objects
    const sortedRecommendedItems = Object.entries(itemTrackCount)
        .sort(([, a], [, b]) => b - a)
        .map(([name, count]) => ({ name, count }));

    // Returning a diciontary with the drivers and he count of courses that it covers from 
    // the missing courses list
    return sortedRecommendedItems
}

export const findCoursesWithoutCoverage = async (allCoursesList, coveredCoursesList) => {
    let coursesQTY = allCoursesList.length
    let notCovCoursesQTY = coveredCoursesList.length
    console.log("There are ", coursesQTY, " in total and you cover ", notCovCoursesQTY)
    console.log("You still have to cover ", coursesQTY - notCovCoursesQTY, " courses")
    let coursesNotCov = allCoursesList.filter(course => !coveredCoursesList.some(coveredCourse => coveredCourse === course))
    return coursesNotCov
}

export const findCoursesWithCoverage = async (items, userItems) => {
    let coveredCourses = new Set();

    //we iterate through all the drivers available
    userItems.forEach(userItem => {

        //if the user has it
        if (userItem.owned) {

            //Getting the driver with the corresponding id
            const driver = items.find(i => i.id === userItem.id);
            // Iterate through the favorite courses and add them to the list
            // as coveredCourses is a Set it wont accept repeated elemnts
            if (driver) {
                driver.favorite_courses.forEach(course => coveredCourses.add(course));
            }

        }
    })
    //Get the array from the set
    return Array.from(coveredCourses);
}

export const fetchUserDrivers = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let driversList = await fetch('/python/example/MyDrivers.json')

        if (!driversList.ok) {
            throw new Error('failed to fetch drivers')
        }

        let json_drivers = await driversList.json()
        return json_drivers

    } catch (error) {
        console.error("Error while fetching data:", error)
    }
}

export const fetchUserKarts = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let kartsList = await fetch('/python/example/MyKarts.json')

        if (!kartsList.ok) {
            throw new Error('failed to fetch drivers')
        }

        let json_karts = await kartsList.json()
        return json_karts

    } catch (error) {
        console.error("Error while fetching data:", error)
    }
}

export const fetchUserGliders = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let glidersList = await fetch('/python/example/MyGliders.json')

        if (!glidersList.ok) {
            throw new Error('failed to fetch drivers')
        }

        let json_gliders = await glidersList.json()
        return json_gliders

    } catch (error) {
        console.error("Error while fetching data:", error)
    }
}

