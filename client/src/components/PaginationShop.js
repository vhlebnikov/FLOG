import React from 'react';
import {CustomProvider, Pagination} from "rsuite";

const PaginationShop = ({activePage, setActivePage, limit, setLimit, count}) => {

    return (
        <>
            {count<=12 ?
                null
                :
                <Pagination
                    style={{WebkitTextFillColor: "#025b2a"}}
                    color="green"
                    appearance="ghost"
                    className="mt-2 success"
                    total={count}
                    limit={limit}
                    activePage={activePage}
                    onChangePage={setActivePage}
                    maxButtons={10}
                    ellipsis={true}
                    first={true}
                    last={true}
                    boundaryLinks={true}
                    onChangeLimit={v => {
                        setLimit(v)
                        setActivePage(1)
                    }}
                />

            }

        </>
    );
};

export default PaginationShop;