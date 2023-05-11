import React, {useContext, useEffect} from 'react';

import frog from "../dasha/Frog.svg";


const NotFoundAd = () => {

    return (
        <div style={{ textAlign: 'center', marginTop: '50px'  }}>
            <h1>Объявление не найдено</h1>
            <p>Извините, но такого объявления не существует. Пожалуйста, проверьте URL и попробуйте еще раз.</p>
            <img src={frog} alt="Error" style={{ width: '200px', height: '200px' }} />

        </div>


    );
};

export default NotFoundAd;