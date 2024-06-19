"use client"

import Styles from './ItemCoverageForm.module.css'

export default function ItemCoverageForm({ type, handleChange, handleSubmit, formData}){

    return (
        <div className={Styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>{type} coverage search on missing courses</h2>

                <label htmlFor="itemName">Item name to be searched on {type}: </label>
                <br/>

                <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}>                    
                </input>

                <br/>
                <br/>

                <button type="submit">Search</button>
            </form>

        </div>
    )

}