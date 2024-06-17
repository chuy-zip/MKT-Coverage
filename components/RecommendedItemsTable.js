import Styles from './RecommendedItemsTable.module.css'

export default function RecommendedItemsTable({ recommendedItems, type }) {

    return (
        <div className={Styles.tableContainer}>
            <h2> This are your reccomended {type} based on your missing courses</h2>
            <table className={Styles.table}>
                <thead>
                    <tr className={Styles.tableHeader}>
                        <th> No. </th>
                        <th style={{ textAlign: 'left' }}>{type.substring(0, type.length - 1)} name</th>
                        <th >Rarity</th>
                        <th >Missing Courses It Covers</th>
                    </tr>
                </thead>

                <tbody>

                    {recommendedItems.map((item, index) => (
                        <tr key={index} className={Styles.tableData}>
                            <td> {index + 1}</td>
                            <td >{item.name}</td>
                            <td >{item.rarity}</td>
                            <td >{item.count}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )

}