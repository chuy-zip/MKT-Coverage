import Styles from 'components/CoursesCoverageData.module.css'
import useDrivers from '@/hooks/useDrivers'
import useGliders from '@/hooks/useGliders'
import useKarts from '@/hooks/useKarts'

import { useMemo } from 'react'

export default function CoursesCoverageData({ type }) {

    const { driversCoveredCourses, driversNotCoveredCourses } = useDrivers()
    const { kartsCoveredCourses, kartsNotCoveredCourses } = useKarts()
    const { glidersCoveredCourses, glidersNotCoveredCourses } = useGliders()

    const itemCoursesCoverageMap = useMemo(() => ({
        Drivers: {covered: driversCoveredCourses, notCovered: driversNotCoveredCourses},
        Karts: {covered: kartsCoveredCourses, notCovered: kartsNotCoveredCourses},
        Gliders: {covered: glidersCoveredCourses, notCovered: glidersNotCoveredCourses}
    }), [driversCoveredCourses, driversNotCoveredCourses, 
        kartsCoveredCourses, kartsNotCoveredCourses, 
        glidersCoveredCourses, glidersNotCoveredCourses])

    const currentCoveredCourses = itemCoursesCoverageMap[type]?.covered
    const currentNotCoveredCourses = itemCoursesCoverageMap[type]?.notCovered
    
    let totalCourses = currentCoveredCourses.length + currentNotCoveredCourses.length

    return (
        <div className={Styles.dataContainer}>
            <h2> There are {totalCourses} in total and your {type} cover {currentCoveredCourses.length} of them</h2>
            <h3> You still have to cover {currentNotCoveredCourses.length}: </h3>

            <div className={Styles.missingCourses}>

                <ol>
                    {currentNotCoveredCourses.map((course, index) => (
                        <li key={index}>{course}</li>
                    ))}
                </ol>

            </div>
        </div>

    )
}