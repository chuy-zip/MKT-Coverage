import Styles from 'components/CoursesCoverageData.module.css'

export default function CoursesCoverageData({ type, coveredCourses, coursesNotCovered }) {

    let totalCourses = coveredCourses.length + coursesNotCovered.length

    return (
        <div>
            <div className={Styles.dataContainer}>
                <h2> There are {totalCourses} in total and your {type} cover {coveredCourses.length} of them</h2>
                <h3> You still have to cover {coursesNotCovered.length}: </h3>

            </div>

            <ul>
                {coursesNotCovered.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
            
        </div>

    )
}