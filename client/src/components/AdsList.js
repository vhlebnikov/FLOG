import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AdItem from "./AdItem";

const AdsList = observer(() => {
    const {ad} = useContext(Context)

    return (
        <Row fluid={+true}>
            {Array.isArray(ad.ads) && ad.ads.map(ad =>
                <AdItem key = {ad.id} ad = {ad}/>
            )}
        </Row>
    );
});

export default AdsList;