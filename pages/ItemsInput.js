'use client'

import { useState } from "react"

export default function ItemsInput() {

    const [data, setData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const contents = e.target.result;
            const parsedData = JSON.parse(contents);
            setData(parsedData);
            console.log(parsedData); // Process the data here
        };

        reader.readAsText(file);
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'processedData.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

    return (
        <div>
            <h1>Welcome, please enter the following files if you already have them</h1>

            <label htmlFor="fileInput">Please enter the JSON file for your owned Karts</label>
            <br/>

            <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept="application/json"
                onChange={handleFileChange}>
            </input>

            <br/>
            {data && <button onClick={handleDownload}>Download Processed Data</button>}

        </div>
    )

}