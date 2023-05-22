import React from 'react';
import frog from "../assets/FrogSad.svg";

const AdBlockDetected = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px'  }}>
            <h1>Обнаружен AdBlock</h1>
            <p>Пожалуйста выключите AdBlock для нормальной работы сайта.</p>
            <img src={frog} alt="Error" style={{ width: '200px', height: '200px' }} />
            <p style={{color: "#cfcccc"}}>Если вы уверены, что он отключен, пожалуйста перезагрузите страницу</p>
        </div>
    );
};

export default AdBlockDetected;