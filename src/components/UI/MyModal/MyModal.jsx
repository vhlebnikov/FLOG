import React from 'react';
import cl from "./MyModal.module.css"
import cross from "./cross.png"

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    if(visible){
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <img src = {cross} onClick={() => setVisible(false)} height="20" width="27"/>
                {children}
            </div>
        </div>
    );
};

export default MyModal;