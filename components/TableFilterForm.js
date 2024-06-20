"use client"

import Styles from './TableFilterForm.module.css'

export default function TableFilterForm({ skillList, formData, handleChange, handleSubmit, selectedSkill, handleSelectionChange }) {

    return (
        <div className={Styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>Select how you want to filter the recommendations</h2>

                <input 
                    type="checkbox" 
                    id="High-End" 
                    name="rarity" 
                    value="High-End" 
                    checked={formData.rarity.includes("High-End")}
                    onChange={handleChange} 
                />
                <label htmlFor="High-End">High-End</label>
                
                <input 
                    type="checkbox" 
                    id="Super" 
                    name="rarity" 
                    value="Super" 
                    checked={formData.rarity.includes("Super")}
                    onChange={handleChange} 
                />
                <label htmlFor="Super">Super</label>
                
                <input 
                    type="checkbox" 
                    id="Normal" 
                    name="rarity" 
                    value="Normal" 
                    checked={formData.rarity.includes("Normal")}
                    onChange={handleChange} 
                />
                <label htmlFor="Normal">Normal</label>

                <br/>
                <br/>

                <label htmlFor="skillSelection"> Select Skill: </label>
                <select 
                    id="skillSelection"
                    name="skillSelection"
                    value={selectedSkill}
                    onChange={handleSelectionChange}>
                        <option 
                            value="All"
                            key={0}>
                            All
                        </option>

                        {skillList.map((skill, index) => (
                            <option
                                value={skill}
                                key={index + 1}>
                                    {skill}
                            </option>
                        ))}

                </select>


                <br />
                <br />
                <input type="submit" value="Get recommended items" />
            </form>
        </div>
    )
}
