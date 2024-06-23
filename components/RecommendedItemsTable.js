import Styles from './RecommendedItemsTable.module.css'
import TableFilterForm from '@components/TableFilterForm'
import useDrivers from '@/hooks/useDrivers'
import useKarts from '@/hooks/useKarts'
import useGliders from '@/hooks/useGliders'

import { useMemo, useState } from 'react'

export default function RecommendedItemsTable({ type }) {

    // Hooks usage
    const { driversSkillList, recommendedDrivers } = useDrivers()
    const { kartsSkillList, recommendedKarts } = useKarts()
    const { glidersSkillList, recommendedGliders } = useGliders()

    const recomendationsMap = useMemo(() => ({
        Drivers: { skills: driversSkillList, recommendations: recommendedDrivers },
        Karts: { skills: kartsSkillList, recommendations: recommendedKarts },
        Gliders: { skills: glidersSkillList, recommendations: recommendedGliders }, 

    }), [driversSkillList, recommendedDrivers,
        kartsSkillList, recommendedKarts,
        glidersSkillList, recommendedGliders
    ])

    // Hook for making
    const [recommendationFormData, setRecommendationFormData] = useState({ rarity: [], selectedSkill: 'All' })

    const selectedItemsSkills = recomendationsMap[type]?.skills
    const recommendedItems = recomendationsMap[type]?.recommendations
    const rarityFilter = recommendationFormData.rarity
    const skillFilter = recommendationFormData.selectedSkill
    let skillList = []

    if (skillFilter === 'All') {
        skillList = selectedItemsSkills
    } else {
        skillList.push(skillFilter)
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
        <>
            <TableFilterForm skillList={selectedItemsSkills}
                formData={recommendationFormData}
                handleChange={recommendationHandleChange}
                handleSubmit={recommendationHandleSubmit}>
            </TableFilterForm>

            <div className={Styles.resultContainer}>
                <h2> These are your recommended missing {type} based on your missing courses</h2>
                <div className={Styles.bodyContainer}>
                    <table className={Styles.table}>
                        <thead className={Styles.tableHeader}>
                            <tr className={Styles.tableHeader}>
                                <th> No. </th>
                                <th style={{ textAlign: 'left' }}>{type.substring(0, type.length - 1)} name</th>
                                <th>Skill</th>
                                <th>Rarity</th>
                                <th>Missing Courses it Covers</th>
                            </tr>
                        </thead>

                        <tbody className={Styles.tableData}>
                            {recommendedItems.filter(item =>
                                rarityFilter.includes(item.rarity) && skillList.includes(item.skill)
                            ).map((item, index) => (
                                <tr key={item.name}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.skill}</td>

                                    <td className={
                                        (item.rarity === 'High-End' || item.rarity === 'Super') ?
                                            ((item.rarity === 'Super') ? Styles.super : Styles.highEnd)
                                            :
                                            Styles.normal
                                    }>
                                        {item.rarity}
                                    </td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
