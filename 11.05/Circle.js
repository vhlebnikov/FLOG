import React from 'react';

const Circle = ({ color, letters }) => {
    return (
        <div className="circle" style={{ backgroundColor: color }}>
            <span className="letters">{letters}</span>
        </div>
    );
};

export default Circle;
