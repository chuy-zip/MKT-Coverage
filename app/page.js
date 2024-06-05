"use client";

import styles from "./page.module.css";
import myDrivers from "@public/python/example/MyDrivers.json"
import courses from "@public/python/courses_data.json"
import drivers from "@public/python/drivers_data.json"

import { useEffect, useState } from "react";

export default function Home() {

  const [userDrivers, setUserDrivers] = useState([])
  const [coveredCourses, setcoveredCourses] = useState([])
  const [allCourses, setAllCourses] = useState(courses)
  const [allDrivers, setAllDrivers] = useState(drivers)

  const findCoursesWithoutCoverage = (allCoursesList, coveredCoursesList) => {

  }

  const findCoursesWithCoverage = (allDrivers, allUserDrivers) => {
    let coveredCourses = new Set();

    //we iterate through all the drivers available
    allUserDrivers.forEach(userDriver => {

      //if the user has it
      if (userDriver.owned) {

        //Getting the driver with the corresponding id
        const driver = allDrivers.find(d => d.id === userDriver.id);
        // Iterate through the favorite courses and add them to the list
        // as coveredCourses is a Set it wont accept repeated elemnts
        if (driver) {
          driver.favorite_courses.forEach(course => coveredCourses.add(course));
        }

      }
    })
    //Get the array from the set
    return Array.from(coveredCourses);
  }

  const fetchUserDrivers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      let driversList = await fetch('/python/example/MyDrivers.json')

      if (!driversList.ok) {
        throw new Error('failed to fetch drivers')
      }

      let json_drivers = await driversList.json()
      return json_drivers

    } catch (error) {
      console.error("Error while fetching data:", error)
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      const Udrivers = await fetchUserDrivers();
      setUserDrivers(Udrivers);
      console.log(Udrivers);
      console.log(courses)
      console.log(allDrivers)
      console.log("Have coverage", findCoursesWithCoverage(allDrivers, Udrivers))
    };

    fetchData();
  }, [])

  return (
    <main className={styles.main}>
      <div>
        Hi from the initial config for MKT-Coverage :o
      </div>
    </main>
  );
}
