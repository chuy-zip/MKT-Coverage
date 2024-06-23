'use client'

import {
    fetchUserKarts,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
    getAllAbilitiesFromItems
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import karts from "@public/python/karts_data.json"

import { createContext, useContext, useEffect, useState } from "react";

const KartsContext = createContext({})

const KartsProvider = ({ children }) => {

    const [userKarts, setUserkarts] = useState([])
    const [kartsCoveredCourses, setKartsCoveredCourses] = useState([])
    const [kartsNotCoveredCourses, setKartsNotCoveredCourses] = useState([])
    const [recommendedKarts, setRecommendedKarts] = useState([])
    const [allCourses] = useState(courses)
    const [allKarts] = useState(karts)
    const [kartsSkillList, setKartsSkillList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const UKarts = await fetchUserKarts();
                setUserkarts(UKarts);

                const skills = await getAllAbilitiesFromItems(allKarts)
                setKartsSkillList(skills)

            } catch (error) {
                console.error("Error fetching user karts:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (userKarts.length > 0) {
                try {
                    const covCourses = await findCoursesWithCoverage(allKarts, userKarts)
                    setKartsCoveredCourses(covCourses)
                    console.log("Covered courses", covCourses)

                    const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses)
                    setKartsNotCoveredCourses(coursesNotCov)
                    console.log("Courses not covered", coursesNotCov)

                    const recKarts = await recommendItemsByCoverage(coursesNotCov, allKarts, userKarts)
                    setRecommendedKarts(recKarts)
                    console.log("Recommended Karts:", recKarts)
                } catch (error) {
                    console.error("Error fetching karts data:", error);
                }
            }
        };

        fetchData();

    }, [userKarts])

    return (
        <KartsContext.Provider value={{
            userKarts,
            kartsCoveredCourses,
            kartsNotCoveredCourses,
            recommendedKarts,
            allKarts,
            kartsSkillList,
            setUserkarts
        }}>
            {children}
        </KartsContext.Provider>
    )
}

const useKarts = () => {
    return useContext(KartsContext)
}

export default useKarts
export { KartsProvider }
