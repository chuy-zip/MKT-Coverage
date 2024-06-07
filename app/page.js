"use client";

import styles from "./page.module.css";

import { fetchUserDrivers, 
         findCoursesWithCoverage, 
         findCoursesWithoutCoverage,
         recommendItemsByCoverage } from "@/controller/itemController";

import courses from "@public/python/courses_data.json"
import drivers from "@public/python/drivers_data.json"

import { useEffect, useState } from "react";


export default function Home() {

  return (
    <main className={styles.main}>
      <h1>
        Hi from the initial version for MKT-Coverage :o
      </h1>

      <h2>
        Take a look to this pages and check the cnosole log to see the results
      </h2>

      <ul>
        <li> <a href="http://localhost:3000/Coverage/drivers"> Drivers Coverage </a></li>
        <li> <a href="http://localhost:3000/Coverage/karts">Karts Coverage </a></li>
        <li> <a href="http://localhost:3000/Coverage/gliders">Gliders Coverage</a></li>
      </ul>
    </main>
  );
}
