"use client"


export default function ItemCoverageForm({ type, handleChange, handleSubmit, formData}){

    return (
        <div>
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
                <button type="submit">Submit</button>
            </form>

        </div>
    )

}