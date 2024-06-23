"use client"

import Styles from './ItemCoverageForm.module.css'
import useDrivers from '@/hooks/useDrivers'
import useGliders from '@/hooks/useGliders'
import useKarts from '@/hooks/useKarts'

import { countItemsFavoritesFromMissingCourses } from '@/controller/itemController'

import { useMemo, useState } from 'react'

export default function ItemCoverageForm({ type, setSearchedItem }){

    //Hooks usage and setup
    const { allDrivers , driversNotCoveredCourses } = useDrivers()
    const { allKarts, kartsNotCoveredCourses } = useKarts()
    const { allGliders , glidersNotCoveredCourses } = useGliders()

    const itemCoursesCoverageMap = useMemo(() => ({
        Drivers: {all: allDrivers, notCovered: driversNotCoveredCourses},
        Karts: {all: allKarts, notCovered: kartsNotCoveredCourses},
        Gliders: {all: allGliders, notCovered: glidersNotCoveredCourses}
    }), [allDrivers, driversNotCoveredCourses, 
        allKarts, kartsNotCoveredCourses, 
        allGliders, glidersNotCoveredCourses])

    const allSelectedItems = itemCoursesCoverageMap[type]?.all
    const selectedNotCoveredCourses = itemCoursesCoverageMap[type]?.notCovered

    // Form handling
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
            alert("Please enter an item to search")
            return
        }

        try {
            const itemCount = await countItemsFavoritesFromMissingCourses(formData.itemName, allSelectedItems, selectedNotCoveredCourses)
            if (!itemCount) {
                alert(`Unable to find the searched item on ${type}`)
            }

            setSearchedItem(itemCount)

        } catch (error) {
            console.error("Something wen't wrong", error)

        }
    }

    return (
        <div className={Styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>{type} coverage search on missing courses</h2>

                <label htmlFor="itemName">Item name to be searched on {type}: </label>
                <br/>

                <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}>                    
                </input>

                <br/>
                <br/>

                <button type="submit">Search</button>
            </form>

        </div>
    )

}