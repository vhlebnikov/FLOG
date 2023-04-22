import React, {useContext, useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AdItem from "./AdItem";


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
        <Row fluid={+true}>
            {useFilterAds([...ad.ads], ad.sort, ad.filter)
                .map(ad =>
                    <AdItem key = {ad.id} ad = {ad}/>
            )}
        </Row>
    );
});

export default AdsList;

// .sort((ad1, ad2) => ad1[ad.sort] > ad2[ad.sort] ? 1 : -1)
// .filter(ad => ad.name.toLowerCase().includes(ad.filter))