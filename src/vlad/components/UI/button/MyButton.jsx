import React, {useRef} from 'react';
import classes from './MyButton.module.css';
import useHover from "../../../hooks/useHover";

const MyButton = ({children, ...props}) => {
    const ref = useRef()
    const isHover = useHover(ref)
    if(isHover) {
        return (
            <button ref = {ref} {...props} className={classes.myActBtn}>
                {children}
            </button>
        );
    } else {
        return (
            <button ref = {ref} {...props} className={classes.myBtn}>
                {children}
            </button>
        );
    }
};

export default MyButton;