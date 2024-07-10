import Styles from './ItemsInput.module.css'

import ItemsInputBox from "@/components/ItemInputBox"

export default function ItemsInput() {
    
    return (
        <>
            <h1>Welcome, please enter the following files if you already have them</h1>
            <div className={Styles.InputBoxesContainer}>

                <ItemsInputBox type={"Drivers"} />

                <ItemsInputBox type={"Karts"} />

                <ItemsInputBox type={"Gliders"} />

            </div>
        </>
    )

}