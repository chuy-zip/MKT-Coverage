"use client"

import '../app/globals.css'
import styles from './Coverage.module.css'
import { Providers } from "../app/providers";

import useDrivers from '@/hooks/useDrivers';
import useKarts from '@/hooks/useKarts';
import useGliders from '@/hooks/useGliders';

import CoursesCoverageData from '@/components/CoursesCoverageData';
import SearchedItemCoverage from '@/components/SearchedItemCoverage';
import RecommendedItemsTable from '@/components/RecommendedItemsTable';
import Items from '@/components/Items';
import ItemTypeBar from '@/components/ItemTypeBar';

import {
    countItemsFavoritesFromMissingCourses,
    getAllAbilitiesFromItems
} from "@/controller/itemController";

import { useState, useEffect } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";
import TableFilterForm from '@/components/TableFilterForm';

export default function Coverage() {

    const { userDrivers, driversCoveredCourses, driversNotCoveredCourses, recommendedDrivers, allDrivers } = useDrivers()
    const { userKarts, kartsCoveredCourses, kartsNotCoveredCourses, recommendedKarts, allKarts } = useKarts()
    const { userGliders, glidersCoveredCourses, glidersNotCoveredCourses, recommendedGliders, allGliders } = useGliders()

    const [recommendationFormData, setRecommendationFormData] = useState({ rarity: [], selectedSkill: 'All' })
    const [selectedItemsSkills, setSelectedItemsSkills] = useState()

    const [searchedItem, setSearchedItem] = useState()
    const [selectedItemType, setSelectedItemType] = useState("Drivers")
    const [selectedRecommendedItems, setSelectedRecommendedItems] = useState(recommendedDrivers)


    useEffect(() => {

        const initializeData = async () => {

            if (selectedItemType === 'Karts' && allKarts) {
                console.log("Aqui")
                setSelectedRecommendedItems(recommendedKarts)
                const skillList = await getAllAbilitiesFromItems(allKarts)
                setSelectedItemsSkills(skillList)

            } else if (selectedItemType === 'Gliders' && allGliders) {
                console.log("Aqui2")
                setSelectedRecommendedItems(recommendedGliders)
                const skillList = await getAllAbilitiesFromItems(allGliders)
                setSelectedItemsSkills(skillList)

            } else if (selectedItemType === "Drivers" && allDrivers) {
                console.log("Aqui3")
                setSelectedRecommendedItems(recommendedDrivers)
                const skillList = await getAllAbilitiesFromItems(allDrivers)
                setSelectedItemsSkills(skillList)
            }
        }


        initializeData()

    }, [selectedItemType, userKarts, kartsCoveredCourses, kartsNotCoveredCourses, recommendedKarts,
        userDrivers, driversCoveredCourses, driversNotCoveredCourses, recommendedDrivers,
        userGliders, glidersCoveredCourses, glidersNotCoveredCourses, recommendedGliders])


    const recommendationHandleChange = (e) => {
        const { name, value, checked, type } = e.target;

        if (type === 'checkbox') {
            setRecommendationFormData(prevState => {
                if (checked) {
                    return {
                        ...prevState,
                        [name]: [...prevState[name], value]
                    }
                } else {
                    return {
                        ...prevState,
                        [name]: prevState[name].filter(item => item !== value)
                    }
                }
            });
        } else {
            setRecommendationFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const recommendationHandleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted with data: ", recommendationFormData)
        // Handle form submission logic here
    }

    return (
        <Providers>

            <div className={styles.pageContainer}>

                <h1>
                    This is the page for {selectedItemType} coverage
                </h1>

                <ItemTypeBar selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />

                <h2>
                    Select the {selectedItemType} you own and then press the button to get the recommended items
                </h2>

                <Items type={selectedItemType} />

                <CoursesCoverageData type={selectedItemType} />

                <ItemCoverageForm type={selectedItemType} setSearchedItem={setSearchedItem} />

                {searchedItem && <SearchedItemCoverage searchedItem={searchedItem} />}

                {selectedItemsSkills && <TableFilterForm
                    skillList={selectedItemsSkills}
                    formData={recommendationFormData}
                    handleChange={recommendationHandleChange}
                    handleSubmit={recommendationHandleSubmit}
                />}

                {recommendationFormData.selectedSkill && selectedRecommendedItems && selectedItemsSkills && <RecommendedItemsTable
                    selectedItemsSkills={selectedItemsSkills}
                    recommendationFormData={recommendationFormData}
                    recommendedItems={selectedRecommendedItems}
                    type={selectedItemType} />}
            </div>
        </Providers>
    )
}