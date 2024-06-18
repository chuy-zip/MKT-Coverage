"use client"

import '../../app/globals.css'
import styles from './coveragePage.module.css'

import useDrivers from '@/hooks/useDrivers';
import useKarts from '@/hooks/useKarts';
import useGliders from '@/hooks/useGliders';

import CoursesCoverageData from '@/components/CoursesCoverageData';
import SearchedItemCoverage from '@/components/SearchedItemCoverage';
import RecommendedItemsTable from '@/components/RecommendedItemsTable';
import Items from '@/components/Items';
import ItemTypeBar from '@/components/itemTypeBar';

import {
    countItemsFavoritesFromMissingCourses
} from "@/controller/itemController";

import { useState, useEffect } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";

export default function Karts() {

    const { userDrivers, driversCoveredCourses, driversNotCoveredCourses, recommendedDrivers, allDrivers } = useDrivers()
    const { userKarts, kartsCoveredCourses, kartsNotCoveredCourses, recommendedKarts, allKarts } = useKarts()
    const { userGliders, glidersCoveredCourses, glidersNotCoveredCourses, recommendedGliders, allGliders } = useGliders()

    const [formData, setFormData] = useState({
        itemName: '',
    })

    const [searchedItem, setSearchedItem] = useState()
    const [selectedItemType, setSelectedItemType] = useState("Drivers")
    const [selectedUserItems, setSelectedUserItems] = useState(userDrivers)
    const [selectedCoveredCourses, setSelectedCoveredCourses] = useState(driversCoveredCourses)
    const [selectedNotCoveredCourses, setSelectedNotCoveredCourses] = useState(driversNotCoveredCourses)
    const [selectedRecommendedItems, setSelectedRecommendedItems] = useState(recommendedDrivers)
    const [allSelectedItems, setAllSelectedItems] = useState(allDrivers)

    useEffect(() => {

        if (selectedItemType === 'Karts') {
            setSelectedUserItems(userKarts)
            setSelectedCoveredCourses(kartsCoveredCourses)
            setSelectedNotCoveredCourses(kartsNotCoveredCourses)
            setSelectedRecommendedItems(recommendedKarts)
            setAllSelectedItems(allDrivers)
        } else if (selectedItemType === 'Gliders') {
            setSelectedUserItems(userGliders)
            setSelectedCoveredCourses(glidersCoveredCourses)
            setSelectedNotCoveredCourses(glidersNotCoveredCourses)
            setSelectedRecommendedItems(recommendedGliders)
            setAllSelectedItems(allGliders)
        } else {
            setSelectedUserItems(userDrivers)
            setSelectedCoveredCourses(driversCoveredCourses)
            setSelectedNotCoveredCourses(driversNotCoveredCourses)
            setSelectedRecommendedItems(recommendedDrivers)
            setAllSelectedItems(allDrivers)
        }


    }, [selectedItemType])

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
            const itemCount = await countItemsFavoritesFromMissingCourses(formData.itemName, allSelectedItems, selectedNotCoveredCourses)
            if (!itemCount) {
                alert("Kart not found")
            }

            setSearchedItem(itemCount)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

    return (
        <div className={styles.pageContainer}>

            <h1>
                This is the page for {selectedItemType} coverage
            </h1>

            <ItemTypeBar selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />

            <h2>
                Select the {selectedItemType} you own and then press the button to get the recommended items
            </h2>

            <Items itemList={selectedUserItems} />

            <ItemCoverageForm type={selectedItemType} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />

            {searchedItem && <SearchedItemCoverage searchedItem={searchedItem} />}

            <CoursesCoverageData type={selectedItemType} coveredCourses={selectedCoveredCourses} coursesNotCovered={selectedNotCoveredCourses} />

            <RecommendedItemsTable recommendedItems={selectedRecommendedItems} type={selectedItemType} />
        </div>
    )
}