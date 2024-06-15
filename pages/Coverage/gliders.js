"use client"

import '../../app/globals.css'
import styles from './coveragePage.module.css'
import useGliders from '@/hooks/useGliders';

import {
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import { useState, Suspense } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";

export default function Gliders() {

    const { userGliders, coveredCourses, coursesNotCovered, recommendedGliders, allGliders } = useGliders()

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
            const gliderCount = await countItemsFavoritesFromMissingCourses(formData.itemName, allGliders, coursesNotCovered)
            console.log("Your item ", gliderCount.name, " covers ", gliderCount.count, "of your missing tracks")
            console.log("The courses are the folowing ", gliderCount.favorite_courses)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

    return (
        <div className={styles.pageContainer}>


            <div>
                This is the page for Gliders coverage
            </div>

            
            <ItemCoverageForm type="Glider" handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />

            <Suspense fallback={<div>Cargando...</div>}>
                <div className={styles.gridItemContainer}>
                    {userGliders.map((glider, index) => (

                        <div key={index} className={glider.owned ? styles.gridItemOwned : styles.gridItemNotOwned}>
                            {glider.name}
                        </div>

                    ))}

                </div>

            </Suspense>
        </div>
    )
}