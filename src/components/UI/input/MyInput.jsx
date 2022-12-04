import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = React.forwardRef((props, ref) => {
    if(props.color === "red") {
        return (
            <input ref={ref} className={classes.myRedInput} {...props}/>
        );
    } else if (props.color === "green"){
        return (
            <input ref={ref} className={classes.myGreenInput} {...props}/>
        );
    }
});

export default MyInput;