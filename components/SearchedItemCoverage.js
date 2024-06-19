import Styles from './SearchedItemCoverage.module.css'

export default function SearchedItemCoverage({ searchedItem }) {
    return (
        <div className={Styles.resultContainer}>
            <p>{searchedItem.name} covers {searchedItem.count} of your missing tracks.</p>
            {searchedItem.count > 0 ? <p>The courses are the following</p> : <p style={{display: 'inline-block'}}> You already own it and/or cover its favorite courses</p>}
            
            <ol className={Styles.result}>
                {searchedItem.favorite_courses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ol>

        </div>
    )
}