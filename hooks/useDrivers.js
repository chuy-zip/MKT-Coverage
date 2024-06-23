'use client'

import {
    fetchUserDrivers,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
    getAllAbilitiesFromItems
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import Drivers from "@public/python/drivers_data.json"

import { createContext, useContext, useEffect, useState } from "react";

const DriversContext = createContext({ userDrivers: [], useDrivers: () => { } })

const DriversProvider = ({ children }) => {

    const [userDrivers, setUserDrivers] = useState([])
    const [driversCoveredCourses, setDriversCoveredCourses] = useState([])
    const [driversNotCoveredCourses, setDriversNotCoveredCourses] = useState([])
    const [recommendedDrivers, setRecommendedDrivers] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allDrivers, setAllDrivers] = useState(Drivers)
    const [driversSkillList, setDriversSkillList] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const UDrivers = await fetchUserDrivers();
                setUserDrivers(UDrivers);

                const skills = await getAllAbilitiesFromItems(allDrivers)
                setDriversSkillList(skills)
            } catch (error) {
                console.error("Error fetching user drivers:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const covCourses = await findCoursesWithCoverage(allDrivers, userDrivers);
                setDriversCoveredCourses(covCourses);
                console.log("Covered courses", covCourses);

                const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses);
                setDriversNotCoveredCourses(coursesNotCov);
                console.log("Courses not covered", coursesNotCov);

                const recDrivers = await recommendItemsByCoverage(coursesNotCov, allDrivers, userDrivers);
                setRecommendedDrivers(recDrivers);
                console.log("Recommended Drivers:", recDrivers);
            } catch (error) {
                console.error("Error fetching drivers data:", error);
            }

        };

        fetchData();

    }, [userDrivers]);

    return (
        <DriversContext.Provider value={{
            userDrivers,
            driversCoveredCourses,
            driversNotCoveredCourses,
            recommendedDrivers,
            allDrivers,
            driversSkillList,
            setUserDrivers
        }}>
            {children}
        </DriversContext.Provider>
    )
}

const useDrivers = () => {
    return useContext(DriversContext)
}

export default useDrivers
export { DriversProvider }