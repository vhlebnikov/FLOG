import React from 'react';
//import cl from './ImgList.module.css'

const ImgList = ({imgs}) => {
    return (
        <div>
            {imgs.map((img, index) =>
                    <div key={index}>
                        {img[0].name}
                    </div>
            )}
        </div>
    );
}

export default ImgList