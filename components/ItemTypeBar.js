import Styles from './ItemTypeBar.module.css'
export default function ItemTypeBar({ setSelectedItemType, selectedItemType }) {

    return (
        <div className={Styles.navContainer}>
            <nav className={Styles.nav}>
                <a className={ selectedItemType === 'Drivers' ? Styles.selected : '' } onClick={() => setSelectedItemType("Drivers")}>Drivers</a>
                <a className={ selectedItemType === 'Karts' ? Styles.selected : '' } onClick={ () => setSelectedItemType("Karts")}>Karts</a>
                <a className={ selectedItemType === 'Gliders' ? Styles.selected : '' } onClick={() => setSelectedItemType("Gliders")}>Gliders</a>
            </nav>
        </div>
    )
}