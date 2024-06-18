
export const countItemsFavoritesFromMissingCourses = async (itemName, itemList, coursesMissingList) => {
    //Initializing a new object
    let itemTrackCount = {
        name: "",
        count: 0,
        favorite_courses: []
    }

    // Creating a set to store non covered courses without repeats
    let notCoveredCourses = new Set();
    const item = itemList.find(i => i.name.toLowerCase() == itemName.toLowerCase().trim())

    // Case in which the requested item by the user is not found
    if(!item){
        return null
    }

    // Saving the real name once the item is confirmed to exist
    itemTrackCount.name = item.name

    // Storing all the courses that the searched item covers form the missing courses list, inside the set
    item.favorite_courses.forEach(course => {
        if(coursesMissingList.some(missingCourse => missingCourse === course)){
            itemTrackCount.count += 1
            notCoveredCourses.add(course)
        }
    })

    // Changing the set into an array and then returning the final object
    itemTrackCount.favorite_courses = Array.from(notCoveredCourses)
    return itemTrackCount
}

export const recommendItemsByCoverage = async (coursesMissingList, items, userItems) => {

    let itemTrackCount = []

    // I iterate through every userItems
    userItems.forEach(userItem => {

        // I'm looking to recommend drivers that the user does not posses
        if (!userItem.owned) {
            const itemNotOwned = items.find(item => item.id === userItem.id)

            // Iterate through the favorite courses of the drivers that are not owned
            itemNotOwned.favorite_courses.forEach(course => {

                let itemFound = itemTrackCount.find(savedItem => savedItem.name === itemNotOwned.name)

                // Here I find and count each time a not owned driver has a missinCourse as a favorite course
                if (coursesMissingList.some(missingCourse => missingCourse === course)) {

                    if (!itemFound) {
                        itemTrackCount.push({ 
                            name: itemNotOwned.name, 
                            rarity: itemNotOwned.rarity, 
                            skill: itemNotOwned.skill,
                            count: 1})

                    } else {
                        itemFound.count += 1
                    }
                }
            })
        }
    })

    //sorting the array of objects
    itemTrackCount.sort((a, b) => {
        if (a.count < b.count){
            return 1
        }
        if (a.count > b.count){
            return -1
        }
        return 0
    })

    return itemTrackCount
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

