"use client"

import Styles from './ItemCoverageForm.module.css'

export default function ItemCoverageForm({ type, handleChange, handleSubmit, formData}){

    return (
        <div className={Styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>{type} coverage on missing courses</h2>

                <label htmlFor="itemName">{type} name:</label>
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