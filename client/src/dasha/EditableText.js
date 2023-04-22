import React, { useState } from 'react';
import component6 from "../dasha/Component6.png";

function EditableText() {
    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState('Your text here');

    const handleEditClick = () => {
        setIsEditable(true);
    }

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSaveClick = () => {
        setIsEditable(false);
    }

    return (
        <div>
            {isEditable ? (
                <div>
                    <div className="wrapper">
                        <input type="text" value={text} onChange={handleInputChange} />

                    </div>

                    <button className="image-button2" onClick={handleSaveClick}>
                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                    </button>
                </div>
            ) : (
                <div>
                    <div className="wrapper">
                        <p>{text}</p>

                    </div>


                    <button className="image-button2" onClick={handleEditClick}>
                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                    </button>
                </div>
            )}
        </div>
    );
}

export default EditableText;

//<button onClick={handleSaveClick}>Save</button>
//<button onClick={handleEditClick}>Edit</button>
//<p>{text2}</p>