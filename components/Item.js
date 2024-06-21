"use client"

import Styles from './Item.module.css'

export default function Item({ index, item, setItems }) {

    const changeOwnedStatus = () => {
        console.log("inputTest")
        setItems(prevState => {
            return prevState.map(listItem =>
                listItem.name === item.name ? { ...listItem, owned: !listItem.owned } : listItem
            );
        });
    };

    return (
        <div
            onClick={changeOwnedStatus}
            key={index}
            className={item.owned ? Styles.gridItemOwned : Styles.gridItemNotOwned}>
            {item.name}
        </div>
    )
}
