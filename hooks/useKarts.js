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
    const [kartsCoveredCourses, setKartsCoveredCourses] = useState([])
    const [kartsNotCoveredCourses, setKartsNotCoveredCourses] = useState([])
    const [recommendedKarts, setRecommendedKarts] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allKarts, setAllKarts] = useState(karts)
    

    useEffect(() => {
        const fetchData = async () => {
            const UKarts = await fetchUserKarts();
            setUserkarts(UKarts);
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (userKarts){
                const covCourses = await findCoursesWithCoverage(allKarts, userKarts)
                setKartsCoveredCourses(covCourses)
                console.log("Covered courses", covCourses)
    
                const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
                setKartsNotCoveredCourses(coursesNotCov)
                console.log("Courses not covered", coursesNotCov)
    
                const recKarts = await recommendItemsByCoverage(coursesNotCov, allKarts, userKarts)
                setRecommendedKarts(recKarts)
                console.log("Recommended Karts:", recKarts)
            }
        };

        fetchData();

    }, [userKarts])

    return {userKarts, kartsCoveredCourses, kartsNotCoveredCourses, recommendedKarts, allKarts, setUserkarts}
}

export default useKarts