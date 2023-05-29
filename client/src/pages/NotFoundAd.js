import React from 'react';
import frog from "../assets/FrogSad.svg";

const NotFoundAd = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px'  }}>
            <h1 style={{
                color: '#133612',
                fontFamily: 'Century Gothic',
                fontWeight: 500,
                fontSize: 40
            }}>Объявление не найдено</h1>
            <p>Извините, но такого объявления не существует. Пожалуйста, проверьте URL и попробуйте еще раз.</p>
            <img src={frog} alt="Error" style={{ width: '200px', height: '200px' }} />
        </div>
    );
};

export default NotFoundAd;