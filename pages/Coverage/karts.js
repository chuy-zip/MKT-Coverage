"use client"

import '../../app/globals.css'
import styles from './coveragePage.module.css'

import useKarts from '@/hooks/useKarts';

import CoursesCoverageData from '@/components/CoursesCoverageData';
import SearchedItemCoverage from '@/components/SearchedItemCoverage';
import RecommendedItemsTable from '@/components/RecommendedItemsTable';
import Items from '@/components/Items';
import ItemTypeBar from '@/components/itemTypeBar';

import {
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import { useState } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";

export default function Karts() {

    const { userKarts, coveredCourses, coursesNotCovered, recommendedKarts, allKarts } = useKarts()
    const [formData, setFormData] = useState({
        itemName: '',
    })
    const [searchedKart, setSearchedKart] = useState()
    const [selectedItemType, setSelectedItemType] = useState("Drivers")

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
                This is the page for {selectedItemType} coverage
            </h1>

            <ItemTypeBar selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType}/>

            <h2>
                Select the {selectedItemType} you own and then press the button to get the recommended items
            </h2>

            <Items itemList={userKarts} />

            <ItemCoverageForm type="Karts" handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
            
            { searchedKart && <SearchedItemCoverage searchedItem={searchedKart}/>}

            <CoursesCoverageData type={"Karts"} coveredCourses={coveredCourses} coursesNotCovered={coursesNotCovered} />

            <RecommendedItemsTable recommendedItems={recommendedKarts} type={"Karts"}/>
        </div>
    )
}