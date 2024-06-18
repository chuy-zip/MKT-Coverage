import Styles from './Items.module.css'

export default function Items({ itemList }) {
    return (
        <div className={Styles.gridItemContainer}>
            {itemList.map((item, index) => (

                <div key={index} className={item.owned ? Styles.gridItemOwned : Styles.gridItemNotOwned}>
                    {item.name}
                </div>

            ))}

        </div>
    )
}