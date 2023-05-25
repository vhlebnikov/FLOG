import React from 'react';
import {CustomProvider, Pagination} from "rsuite";



const PaginationShop = ({activePage, setActivePage, limit, setLimit, count}) => {
    const limitOptions = [12, 24, 48]
    const layout = ['limit', '|', 'pager']
    const locale = {
        Pagination: {
            limit: '{0} объявлений на странице'
        }};
    return (
        <CustomProvider locale = {locale}>
            {count<=12 ?
                null
                :
                <Pagination
                    style={{WebkitTextFillColor: "#025b2a"}}
                    color="green"
                    appearance="ghost"
                    className="mt-2 success"
                    layout={layout}
                    total={count}
                    limit={limit}
                    activePage={activePage}
                    onChangePage={setActivePage}
                    maxButtons={2}
                    ellipsis={true}
                    first={true}
                    last={true}
                    boundaryLinks={true}
                    limitOptions={limitOptions}
                    onChangeLimit={setLimit}
                />

            }

        </CustomProvider>
    );
};

export default PaginationShop;