import Styles from './RecommendedItemsTable.module.css'

export default function RecommendedItemsTable({ selectedItemsSkills, recommendationFormData, recommendedItems, type }) {

    const rarityFilter = recommendationFormData.rarity
    const skillFilter = recommendationFormData.selectedSkill
    let skillList = []

    if (skillFilter === 'All'){
        skillList = selectedItemsSkills
    } else{
        skillList.push(skillFilter)
    }

    return (
        <div className={Styles.resultContainer}>
            <h2> This are your recommended missing {type} based on your missing courses</h2>
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

                        {recommendedItems.map((item, index) => (

                            (rarityFilter.some(rarity => rarity === item.rarity) && skillList.some(skill => skill === item.skill)) ?
                                <tr key={index} >
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
                                :
                                <></>
                        ))}

                    </tbody>
                </table>
            </div>

        </div >
    )

}