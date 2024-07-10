import Styles from './ItemInputBox.module.css'

import { useState } from 'react';

export default function ItemsInputBox({ type }) {

    const [data, setData] = useState(null);
    const [fileName, setFileName] = useState('Choose a JSON File')

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name)
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

    const handleDrop = (event) => {
        event.preventDefault()

        const droppedFiles = event.dataTransfer.files
        if (droppedFiles.length > 0) {
            const newFiles = Array.from(droppedFiles);
            setData((prevFiles) => [...prevFiles, ...newFiles]);
        }
    }

    return (
        <div className={Styles.InputBoxContainer}>
            <div className={Styles.InputBoxArea}>
                <label htmlFor="fileInput">
                    Please enter the JSON file for your owned {type}
                </label>
                <br />

                <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    accept="application/json"
                    onChange={handleFileChange}
                    
                    className={Styles.ButtonInput}
                />
                <label htmlFor="fileInput" className={Styles.CustomFileInputLabel}>
                    {fileName}
                </label>

                <br />
                {data && (
                    <button onClick={handleDownload}>Download Processed Data</button>
                )}
            </div>
        </div>
    );
}