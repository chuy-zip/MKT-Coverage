"use client";

import styles from "./page.module.css";
import myDrivers from "@public/python/example/MyDrivers.json"
import courses from "@public/python/courses_data.json"
import { useEffect, useState } from "react";

export default function Home() {

  const [userDrivers, setUserDrivers] = useState([])
  const [coveredCourses, setcoveredCourses] = useState([])
  const [allCourses, setAllCourses] = useState(courses)

  const findCoursesWithoutCoverage = ( allCoursesList, coveredCoursesList) => {

  }

  const findCoursesWithCoverage = ( drivers ) => {

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

  

  useEffect( () => {
    const fetchData = async () => {
      const drivers = await fetchUserDrivers();
      setUserDrivers(drivers);
      console.log(drivers);
      console.log(courses)
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
