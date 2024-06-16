"use client"

import '../../app/globals.css'
import styles from './coveragePage.module.css'
import useKarts from '@/hooks/useKarts';
import CoursesCoverageData from '@/components/CoursesCoverageData';

import {
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import { useState, Suspense } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";

export default function Karts() {

    const { userKarts, coveredCourses, coursesNotCovered, recommendedKarts, allKarts } = useKarts()

    const [formData, setFormData] = useState({
        itemName: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.itemName) {
            alert("Please enter an item")
            return
        }

        try {
            const kartCount = await countItemsFavoritesFromMissingCourses(formData.itemName, allKarts, coursesNotCovered)
            console.log("Your item ", kartCount.name, " covers ", kartCount.count, "of your missing tracks")
            console.log("The courses are the folowing ", kartCount.favorite_courses)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

    return (
        <div className={styles.pageContainer}>

            <h1>
                This is the page for karts coverage
            </h1>

            <ItemCoverageForm type="Kart" handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
            
            <Suspense fallback={<div>Cargando...</div>}>
                <div className={styles.gridItemContainer}>
                    {userKarts.map((kart, index) => (

                        <div key={index} className={kart.owned ? styles.gridItemOwned : styles.gridItemNotOwned}>
                            {kart.name}
                        </div>

                    ))}

                </div>

            </Suspense>

            <CoursesCoverageData type={"Karts"} coveredCourses={coveredCourses} coursesNotCovered={coursesNotCovered} />

        </div>
    )
}