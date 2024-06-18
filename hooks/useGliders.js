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
    const [glidersCoveredCourses, setGlidersCoveredCourses] = useState([])
    const [glidersNotCoveredCourses, setGlidersNotCoveredCourses] = useState([])
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
                setGlidersCoveredCourses(covCourses)
                console.log("Covered courses", covCourses)
    
                const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
                setGlidersNotCoveredCourses(coursesNotCov)
                console.log("Courses not covered", coursesNotCov)
    
                const recGliders = await recommendItemsByCoverage(coursesNotCov, allGliders, userGliders)
                setRecommendedGliders(recGliders)
                console.log("Recommended Gliders:", recGliders)
            }
        };

        fetchData();

    }, [userGliders])

    return {userGliders, glidersCoveredCourses, glidersNotCoveredCourses, recommendedGliders, allGliders}
}

export default useGliders