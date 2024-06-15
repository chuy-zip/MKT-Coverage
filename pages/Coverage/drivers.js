"use client"

import '../../app/globals.css'
import styles from './coveragePage.module.css'
import useDrivers from '@/hooks/useDrivers';

import {
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import { useState, Suspense } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";

export default function Drivers() {

    const { userDrivers, coveredCourses, coursesNotCovered, recommendedDrivers, allDrivers } = useDrivers()

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
            const driverCount = await countItemsFavoritesFromMissingCourses(formData.itemName, allDrivers, coursesNotCovered)
            console.log("Your item ", driverCount.name, " covers ", driverCount.count, "of your missing tracks")
            console.log("The courses are the folowing ", driverCount.favorite_courses)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

    return (
        <div className={styles.pageContainer}>


            <div>
                This is the page for Drivers coverage
            </div>

            
            <ItemCoverageForm type="Driver" handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />

            <Suspense fallback={<div>Cargando...</div>}>
                <div className={styles.gridItemContainer}>
                    {userDrivers.map((driver, index) => (

                        <div key={index} className={driver.owned ? styles.gridItemOwned : styles.gridItemNotOwned}>
                            {driver.name}
                        </div>

                    ))}

                </div>

            </Suspense>
        </div>
    )
}