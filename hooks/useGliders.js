"use client"

import {
    fetchUserGliders,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import Gliders from "@public/python/Gliders_data.json"

import { useEffect, useState } from "react";

const useGliders = () => {

    const [userGliders, setUserGliders] = useState([])
    const [coveredCourses, setCoveredCourses] = useState([])
    const [coursesNotCovered, setCoursesNotCovered] = useState([])
    const [recommendedGliders, setRecommendedGliders] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allGliders, setAllGliders] = useState(Gliders)
    

    useEffect(() => {
        const fetchData = async () => {
            const UGliders = await fetchUserGliders();
            setUserGliders(UGliders);
            console.log(UGliders);
            console.log(courses)
            console.log(allGliders)
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (userGliders){
                const covCourses = await findCoursesWithCoverage(allGliders, userGliders)
                setCoveredCourses(covCourses)
                console.log("Covered courses", covCourses)
    
                const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
                setCoursesNotCovered(coursesNotCov)
                console.log("Courses not covered", coursesNotCov)
    
                const recGliders = await recommendItemsByCoverage(coursesNotCov, allGliders, userGliders)
                setRecommendedGliders(recGliders)
                console.log("Recommended Gliders:", recGliders)
            }
        };

        fetchData();

    }, [userGliders])

    return {userGliders, coveredCourses, coursesNotCovered, recommendedGliders, allGliders}
}

export default useGliders