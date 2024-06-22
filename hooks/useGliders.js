'use client'

import {
    fetchUserGliders,
    findCoursesWithCoverage,
    findCoursesWithoutCoverage,
    recommendItemsByCoverage,
} from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import Gliders from "@public/python/Gliders_data.json"

import { createContext, useContext, useEffect, useState } from "react";

const GlidersContext = createContext({})

const GlidersProvider = ({ children }) => {

    const [userGliders, setUserGliders] = useState([])
    const [glidersCoveredCourses, setGlidersCoveredCourses] = useState([])
    const [glidersNotCoveredCourses, setGlidersNotCoveredCourses] = useState([])
    const [recommendedGliders, setRecommendedGliders] = useState([])
    const [allCourses, setAllCourses] = useState(courses)
    const [allGliders, setAllGliders] = useState(Gliders)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const UGliders = await fetchUserGliders();
                setUserGliders(UGliders);
            } catch (error) {
                console.error("Error fetching user gliders:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userGliders.length > 0) {
                try {
                    const covCourses = await findCoursesWithCoverage(allGliders, userGliders);
                    setGlidersCoveredCourses(covCourses);
                    console.log("Covered courses", covCourses);

                    const coursesNotCov = await findCoursesWithoutCoverage(allCourses, covCourses);
                    setGlidersNotCoveredCourses(coursesNotCov);
                    console.log("Courses not covered", coursesNotCov);

                    const recGliders = await recommendItemsByCoverage(coursesNotCov, allGliders, userGliders);
                    setRecommendedGliders(recGliders);
                    console.log("Recommended Gliders:", recGliders);
                } catch (error) {
                    console.error("Error fetching gliders data:", error);
                }
            }
        };

        fetchData();

    }, [userGliders])

    return (
        <GlidersContext.Provider value={{ 
            userGliders, 
            glidersCoveredCourses, 
            glidersNotCoveredCourses, 
            recommendedGliders, 
            allGliders, 
            setUserGliders}}>
                {children}
            </GlidersContext.Provider>
    )
}

const useGliders = () => {
    return useContext(GlidersContext)
}

export default useGliders
export { GlidersProvider }