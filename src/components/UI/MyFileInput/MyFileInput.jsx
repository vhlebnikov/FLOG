import React from 'react';
import cl from "./MyFileInput.module.css";

const MyFileInput = ({onChange}) => {
    return (
        <>
            <div className={cl.button}>
                <label htmlFor="imgs" className={cl.text}>Загрузить изображение</label>
            </div>
            <input id="imgs" type = "file" accept = "image/jpeg, image/png" onChange = {(e) => {onChange(e)}} className={cl.input}/>
        </>
    );
};

export default MyFileInput;