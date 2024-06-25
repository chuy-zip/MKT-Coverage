import { useMemo } from "react";
import useDrivers from "@/hooks/useDrivers";
import useKarts from "@/hooks/useKarts";
import useGliders from "@/hooks/useGliders";

import Styles from './ModifyDataButton.module.css';

export default function ModifyDataButton({ type, ItemsOwnership }) {
    const { setUserDrivers } = useDrivers();
    const { setUserkarts } = useKarts();
    const { setUserGliders } = useGliders();

    const userItemsMap = useMemo(() => ({
        Drivers: setUserDrivers,
        Karts: setUserkarts,
        Gliders: setUserGliders
    }), [setUserDrivers, setUserkarts, setUserGliders]);

    const setItems = userItemsMap[type];

    const handleClick = () => {
        if (setItems) {
            setItems(prevState =>
                prevState.map(item => ({
                    ...item,
                    owned: ItemsOwnership})
                ));
        } else {
            console.error(`Unknown type: ${type}`);
        }
    };

    return (
        <button onClick={handleClick} className={Styles.button}>
            Set all items as {ItemsOwnership ? "Owned" : "Not Owned"}
        </button>
    );
}
