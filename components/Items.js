"use client"
import Styles from './Items.module.css'
import Item from "@components/Item"

export default function Items({ itemList, setItems }) {
    return (
        <div className={Styles.gridItemContainer}>
            {itemList.map((item, index) => (
                <Item key={index} index={index} item={item} setItems={setItems} />
            ))}
        </div>
    )
}
