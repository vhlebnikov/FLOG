import React, {useContext, useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AdItem from "./AdItem";
import frogSad from "../assets/FrogSad.svg";

const AdsList = observer(() => {
    const {ad} = useContext(Context)

    const useSortAds = (sort, ads) => {
        return useMemo(() => {
            if (sort) {
                return [...ads].sort((a, b) => a[sort].localeCompare(b[sort]))
            }
            return ads;
        }, [sort, ads]);
    }

    const useFilterAds = (ads, sort, filter) => {
        const sortedPosts = useSortAds(sort, ads);
        return useMemo(() => {
            return sortedPosts.filter(post => post.name.toLowerCase().includes(filter.toLowerCase()))
        }, [filter, sortedPosts]);
    }

    return (
        <Row >
            {(() => {
                const filteredAds = useFilterAds([...ad.ads], ad.sort, ad.filter);
                if (Array.isArray(ad.ads) && ad.ads.length > 0 && filteredAds.length > 0) {
                    return filteredAds.map(ad => (
                        <AdItem key={ad.id} ad={ad} />
                    ))
                } else {
                    return (
                        <div style={{ textAlign: 'center', marginTop: '10px'  }}>
                            <p style={{color: '#133612', fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 20}}>По заданным параметрам ничего не найдено</p>
                            <img src={frogSad} alt="Error" style={{ width: '100px', height: '100px' }} />
                        </div>

                    )
                }
            })()}
        </Row>
    );
});

export default AdsList;