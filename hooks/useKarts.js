"use client"

import {
    fetchUserKarts,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import karts from "@public/python/karts_data.json"

import { useEffect, useState } from "react";

const useKarts = () => {

    const [userKarts, setUserkarts] = useState([])
    const [coveredCourses, setCoveredCourses] = useState([])
    const [coursesNotCovered, setCoursesNotCovered] = useState([])
    const [recommendedKarts, setRecommendedKarts] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allKarts, setAllKarts] = useState(karts)
    

    useEffect(() => {
        const fetchData = async () => {
            const UKarts = await fetchUserKarts();
            setUserkarts(UKarts);
            console.log(UKarts);
            console.log(courses)
            console.log(allKarts)
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (userKarts){
                const covCourses = await findCoursesWithCoverage(allKarts, userKarts)
                setCoveredCourses(covCourses)
                console.log("Covered courses", covCourses)
    
                const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
                setCoursesNotCovered(coursesNotCov)
                console.log("Courses not covered", coursesNotCov)
    
                const recKarts = await recommendItemsByCoverage(coursesNotCov, allKarts, userKarts)
                setRecommendedKarts(recKarts)
                console.log("Recommended Karts:", recKarts)
            }
        };

        fetchData();

    }, [userKarts])

    return {userKarts, coveredCourses, coursesNotCovered, recommendedKarts, allKarts}
}

export default useKarts