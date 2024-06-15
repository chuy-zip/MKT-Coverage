"use client"

import {
    fetchUserDrivers,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import Drivers from "@public/python/drivers_data.json"

import { useEffect, useState } from "react";

const useDrivers = () => {

    const [userDrivers, setUserDrivers] = useState([])
    const [coveredCourses, setCoveredCourses] = useState([])
    const [coursesNotCovered, setCoursesNotCovered] = useState([])
    const [recommendedDrivers, setRecommendedDrivers] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allDrivers, setAllDrivers] = useState(Drivers)
    

    useEffect(() => {
        const fetchData = async () => {
            const UDrivers = await fetchUserDrivers();
            setUserDrivers(UDrivers);
            console.log(UDrivers);
            console.log(courses)
            console.log(allDrivers)
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (userDrivers){
                const covCourses = await findCoursesWithCoverage(allDrivers, userDrivers)
                setCoveredCourses(covCourses)
                console.log("Covered courses", covCourses)
    
                const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
                setCoursesNotCovered(coursesNotCov)
                console.log("Courses not covered", coursesNotCov)
    
                const recDrivers = await recommendItemsByCoverage(coursesNotCov, allDrivers, userDrivers)
                setRecommendedDrivers(recDrivers)
                console.log("Recommended Drivers:", recDrivers)
            }
        };

        fetchData();

    }, [userDrivers])

    return {userDrivers, coveredCourses, coursesNotCovered, recommendedDrivers, allDrivers}
}

export default useDrivers