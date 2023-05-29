import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AdItem from "./AdItem";
import frogSad from "../assets/FrogSad.svg";

const AdsList = observer(() => {
    const {ad} = useContext(Context)

    return (
        <Row fluid={+true}>
            {Array.isArray(ad.ads) && ad.ads.length ? ad.ads.map(ad =>
                    <AdItem key={ad.id} ad={ad}/>
                )
                :
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <p style={{color: '#133612', fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 20}}>По
                        заданным параметрам ничего не найдено</p>
                    <img src={frogSad} alt="Error" style={{width: '100px', height: '100px'}}/>
                </div>
            }
        </Row>
    );
});

export default AdsList;