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
                    style={{WebkitTextFillColor: "#0D6936", borderColor: "#0D6936"}}
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
                    onChangeLimit={v => {
                        setLimit(v)
                        setActivePage(1)
                    }}
                />

            }

        </CustomProvider>
    );
};

export default PaginationShop;