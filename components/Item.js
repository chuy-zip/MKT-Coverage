import Styles from './Item.module.css'
import useDrivers from '@/hooks/useDrivers';
import useKarts from '@/hooks/useKarts';
import useGliders from '@/hooks/useGliders';

export default function Item({ index, item }) {

    const changeOwnedStatus = () => {
        console.log("El nuevo estatus seria: ", !item.owned)
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