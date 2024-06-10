"use client"

import {
    fetchUserKarts,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import karts from "@public/python/karts_data.json"

import { useEffect, useState } from "react";

export default function Karts() {

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

            const covCourses = await findCoursesWithCoverage(allKarts, UKarts)
            setCoveredCourses(covCourses)
            console.log("Covered courses", covCourses)

            const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
            setCoursesNotCovered(coursesNotCov)
            console.log("Courses not covered", coursesNotCov)

            const recKarts = await recommendItemsByCoverage(coursesNotCov, allKarts, UKarts)
            setRecommendedKarts(recKarts)
            console.log("Recommended Karts:", recKarts)

            const kartCount = await countItemsFavoritesFromMissingCourses("Pink Speeder", allKarts, coursesNotCov)
            console.log("Your item ", kartCount.name, " covers ", kartCount.count, "of your missing tracks")
            console.log("The courses are the folowing ", kartCount.favorite_courses)

        };

        fetchData();
    }, [])

    return (
        <>
            <div>
                This is the page for karts coverage
            </div>
        </>
    )
}