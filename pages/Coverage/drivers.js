import {
    fetchUserDrivers,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import drivers from "@public/python/drivers_data.json"

import { useEffect, useState } from "react";


export default function Drivers() {

    const [userDrivers, setUserDrivers] = useState([])
    const [coveredCourses, setCoveredCourses] = useState([])
    const [coursesNotCovered, setCoursesNotCovered] = useState([])
    const [recommendedDrivers, setRecommendedDrivers] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allDrivers, setAllDrivers] = useState(drivers)

    useEffect(() => {
        const fetchData = async () => {
            const Udrivers = await fetchUserDrivers();
            setUserDrivers(Udrivers);
            console.log(Udrivers);
            console.log(courses)
            console.log(allDrivers)

            const covCourses = await findCoursesWithCoverage(allDrivers, Udrivers)
            setCoveredCourses(covCourses)
            console.log("Covered courses", covCourses)

            const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
            setCoursesNotCovered(coursesNotCov)
            console.log("Courses not covered", coursesNotCov)

            const recDrivers = await recommendItemsByCoverage(coursesNotCov, allDrivers, Udrivers)
            setRecommendedDrivers(recDrivers)
            console.log("Recommended drivers:", recDrivers)

        };

        fetchData();
    }, [])

    return (
        <>
            <div>
                This is the page for Drivers coverage
            </div>
        </>
    )
}