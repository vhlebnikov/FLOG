import React, {useState} from "react";
import photo from "../vlad/components/Pictures/photo.png"
//import { Resizer } from "react-image-file-resizer";


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