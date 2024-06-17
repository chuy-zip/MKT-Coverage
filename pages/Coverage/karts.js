"use client"

import '../../app/globals.css'
import styles from './coveragePage.module.css'
import useKarts from '@/hooks/useKarts';
import CoursesCoverageData from '@/components/CoursesCoverageData';
import SearchedItemCoverage from '@/components/SearchedItemCoverage';
import RecommendedItemsTable from '@/components/RecommendedItemsTable';

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
    const [searchedKart, setSearchedKart] = useState()

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
            if(!kartCount){
                alert("Kart not found")
            }

            setSearchedKart(kartCount)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

    return (
        <div className={styles.pageContainer}>

            <h1>
                This is the page for karts coverage
            </h1>
            <h2>
                Select the karts you own and then press the button to get the recommended items
            </h2>

            <Suspense fallback={<div>Cargando...</div>}>
                <div className={styles.gridItemContainer}>
                    {userKarts.map((kart, index) => (

                        <div key={index} className={kart.owned ? styles.gridItemOwned : styles.gridItemNotOwned}>
                            {kart.name}
                        </div>

                    ))}

                </div>

            </Suspense>

            <ItemCoverageForm type="Kart" handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
            
            { searchedKart && <SearchedItemCoverage searchedItem={searchedKart}/>}

            <CoursesCoverageData type={"Karts"} coveredCourses={coveredCourses} coursesNotCovered={coursesNotCovered} />

            <RecommendedItemsTable recommendedItems={recommendedKarts} type={"Karts"}/>
        </div>
    )
}