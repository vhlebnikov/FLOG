import React, {useContext, useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AdItem from "./AdItem";

const AdsList = observer(() => {
    const {ad} = useContext(Context)

    // const useSortAds = (sort, ads) => {
    //     return useMemo(() => {
    //         if (sort) {
    //             return [...ads].sort((a, b) => a[sort].localeCompare(b[sort]))
    //         }
    //         return ads;
    //     }, [sort, ads]);
    // }
    //
    // const useFilterAds = (ads, sort, filter) => {
    //     const sortedPosts = useSortAds(sort, ads);
    //     return useMemo(() => {
    //         return sortedPosts.filter(post => post.name.toLowerCase().includes(filter.toLowerCase()))
    //     }, [filter, sortedPosts]);
    // }

    return (
        <Row fluid={+true}>
            {Array.isArray(ad.ads) ? ad.ads.map(ad =>
                <AdItem key = {ad.id} ad = {ad}/>
            ): null}
        </Row>
    );
});

export default AdsList;