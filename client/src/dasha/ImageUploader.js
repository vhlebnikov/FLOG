import React, { useState } from "react";
import photo from "./photo.png";



function ImageUploader() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));

    };
    const imageStyle = selectedFile ? { backgroundImage: `url(${selectedFile})` } : { backgroundImage: `url(${photo})` };


    return (
        <div className="image-2">
            {selectedFile ? (
                <img className="thumbnail" src={selectedFile} alt="selected" />
            ) : (
                <label>
                    <div>

                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }}/>
                            <div style={{ backgroundImage: `url(${photo})` }}></div>
                    <div className="image-placeholder" style={imageStyle}></div>
                    </div>
                </label>
            )}
        </div>
    );
}

export default ImageUploader;
/*

.thumbnail {
    max-width: 200px;
    max-height: 300px;
    object-fit: cover;
}
.image-2 {
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    left: 150px;
    top: 100px;
    z-index: -1;
}

.image-2 div {
    width: 200px;
    height: 300px;
    background-position: center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
}
 */

