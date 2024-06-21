"use client"

import '../app/globals.css'
import styles from './Coverage.module.css'

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
    const { setUserkarts, userKarts, kartsCoveredCourses, kartsNotCoveredCourses, recommendedKarts, allKarts } = useKarts()
    const { userGliders, glidersCoveredCourses, glidersNotCoveredCourses, recommendedGliders, allGliders } = useGliders()

    const [formData, setFormData] = useState({
        itemName: '',
    })
    const [recommendationFormData, setRecommendationFormData] = useState({ rarity: [], selectedSkill: 'All'})
    const [selectedItemsSkills, setSelectedItemsSkills] = useState()

    const [searchedItem, setSearchedItem] = useState()
    const [selectedItemType, setSelectedItemType] = useState("Drivers")
    const [selectedUserItems, setSelectedUserItems] = useState(userDrivers)
    const [selectedCoveredCourses, setSelectedCoveredCourses] = useState(driversCoveredCourses)
    const [selectedNotCoveredCourses, setSelectedNotCoveredCourses] = useState(driversNotCoveredCourses)
    const [selectedRecommendedItems, setSelectedRecommendedItems] = useState(recommendedDrivers)
    const [allSelectedItems, setAllSelectedItems] = useState(allDrivers)

    useEffect(() => {

        const initializeData = async () => {

            if (selectedItemType === 'Karts') {
                console.log("Aqui")
                setSelectedUserItems(userKarts)
                setSelectedCoveredCourses(kartsCoveredCourses)
                setSelectedNotCoveredCourses(kartsNotCoveredCourses)
                setSelectedRecommendedItems(recommendedKarts)
                setAllSelectedItems(allKarts)
                const skillList = await getAllAbilitiesFromItems(allKarts)
                setSelectedItemsSkills(skillList)
            } else if (selectedItemType === 'Gliders') {
                console.log("Aqui2")
                setSelectedUserItems(userGliders)
                setSelectedCoveredCourses(glidersCoveredCourses)
                setSelectedNotCoveredCourses(glidersNotCoveredCourses)
                setSelectedRecommendedItems(recommendedGliders)
                setAllSelectedItems(allGliders)
                const skillList = await getAllAbilitiesFromItems(allGliders)
                setSelectedItemsSkills(skillList)
            } else {
                console.log("Aqui3")
                setSelectedUserItems(userDrivers)
                setSelectedCoveredCourses(driversCoveredCourses)
                setSelectedNotCoveredCourses(driversNotCoveredCourses)
                setSelectedRecommendedItems(recommendedDrivers)
                setAllSelectedItems(allDrivers)
                const skillList = await getAllAbilitiesFromItems(allDrivers)
                setSelectedItemsSkills(skillList)
            }
        }


        initializeData()

    }, [selectedItemType, userDrivers, userKarts, userGliders, kartsCoveredCourses, kartsNotCoveredCourses, recommendedKarts])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.itemName) {
            alert("Please enter an item to search")
            return
        }

        try {
            const itemCount = await countItemsFavoritesFromMissingCourses(formData.itemName, allSelectedItems, selectedNotCoveredCourses)
            if (!itemCount) {
                alert(`Unable to find the searched item on ${selectedItemType}`)
            }

            setSearchedItem(itemCount)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

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
        <div className={styles.pageContainer}>

            <h1>
                This is the page for {selectedItemType} coverage
            </h1>

            <ItemTypeBar selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />

            <h2>
                Select the {selectedItemType} you own and then press the button to get the recommended items
            </h2>

            <Items itemList={selectedUserItems} setItems={setUserkarts}/>

            <CoursesCoverageData type={selectedItemType} coveredCourses={kartsCoveredCourses} coursesNotCovered={selectedNotCoveredCourses} />

            <ItemCoverageForm type={selectedItemType} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />

            {searchedItem && <SearchedItemCoverage searchedItem={searchedItem} />}

            {selectedItemsSkills && <TableFilterForm
                skillList={selectedItemsSkills}
                formData={recommendationFormData}
                handleChange={recommendationHandleChange}
                handleSubmit={recommendationHandleSubmit}
            />}

            {recommendationFormData.selectedSkill && <RecommendedItemsTable
                selectedItemsSkills={selectedItemsSkills}
                recommendationFormData={recommendationFormData}
                recommendedItems={selectedRecommendedItems}
                type={selectedItemType} />}
        </div>
    )
}