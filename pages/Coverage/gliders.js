"use client"

import {
    fetchUserGliders,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import gliders from "@public/python/gliders_data.json"

import { useEffect, useState } from "react";

export default function Gliders() {

    const [userGliders, setUserGliders] = useState([])
    const [coveredCourses, setCoveredCourses] = useState([])
    const [coursesNotCovered, setCoursesNotCovered] = useState([])
    const [recommendedGliders, setRecommendedGliders] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allGliders, setAllGliders] = useState(gliders)

    useEffect(() => {
        const fetchData = async () => {
            const UGliders = await fetchUserGliders();
            setUserGliders(UGliders);
            console.log(UGliders);
            console.log(courses)
            console.log(allGliders)

            const covCourses = await findCoursesWithCoverage(allGliders, UGliders)
            setCoveredCourses(covCourses)
            console.log("Covered courses", covCourses)

            const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
            setCoursesNotCovered(coursesNotCov)
            console.log("Courses not covered", coursesNotCov)

            const recGliders = await recommendItemsByCoverage(coursesNotCov, allGliders, UGliders)
            setRecommendedGliders(recGliders)
            console.log("Recommended Gliders:", recGliders)

            const gliderCount = await countItemsFavoritesFromMissingCourses("Wonderful Garnet", allGliders, coursesNotCov)
            console.log("Your item covers ", gliderCount.count, "of your missing tracks")
        };

        fetchData();
    }, [])

    return (
        <>
            <div>
                This is the page for Gliders coverage
            </div>
        </>
    )
}