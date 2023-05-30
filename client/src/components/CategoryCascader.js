import React, {useEffect, useState} from 'react';
import {Cascader} from "rsuite";
import {getCategories} from "../http/categoryApi";
import Form from "react-bootstrap/Form";
import {login} from "../http/userApi";
import {ca} from "date-fns/locale";

function ExtraContainer({children, height = 400}) {
    const container = React.useRef();
    const content = React.useRef();
    const containerStyle = {
        overflow: 'clip',
        position: 'relative',
    };

    const contentStyle = {
        height: '100%',
        width: '300%',
        // justifyContent: 'center',
        // alignItems: 'start',
        // display: 'flex',
        // flexWrap: 'wrap'
    };

    return (
        <div style={{ ...containerStyle, height }} ref={container}>
            <div style={contentStyle} ref={content}>
                {children(() => container.current)}
            </div>
        </div>
    );
}

const CategoryCascader = (props) => {
    const [rootCategories, setRootCategories] = useState([])
    const [selectedCategory, setSelectedCategory, categoryRoute] = props.others
    const [value, setValue] = useState(selectedCategory);

    let categoryPlaceholder = ""

    if (categoryRoute) {
        categoryRoute.forEach((i, index) => {
            categoryPlaceholder = categoryPlaceholder + i.name
            if (index !== categoryRoute.length - 1) {
                categoryPlaceholder += ' / '
            }
        })
    }

    const createNode = async (category) => {
        const children = await getCategories(category.id)

        const label = category.name

        return {
            label,
            value: category.id,
            children: children.length ? [] : null
        }
    }

    const fetchNodes = async (id) => {
        return getCategories(id.value).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => data.map(i => i.value))
    }

    useEffect(() => {
        getCategories(0).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => setRootCategories(data.map(i => i.value)))
    }, [])

    return (
        <>
        {categoryRoute ?
        (
            <ExtraContainer>
                {getContainer => (
                    <Cascader
                        preventOverflow
                        container={getContainer}
                        style={{width:224}}
                        menuWidth={150}
                        searchable={false}
                        parentSelectable={true}
                        value={value}
                        onChange={v => {
                            setValue(v)
                            setSelectedCategory(v)
                        }}
                        placeholder={categoryPlaceholder}
                        data={rootCategories}
                        getChildren={fetchNodes}
                        renderMenu={(children, menu, parentNode) => {
                            if (parentNode && parentNode.loading) {
                                return <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>Loading...</p>;
                            }
                            return menu;
                        }}
                    />
                )}
            </ExtraContainer>
        )
        :
        (
            <Cascader
                style={{width:224}}
                searchable={false}
                parentSelectable={true}
                menuWidth={150}
                value={value}
                onChange={v => {
                    setValue(v)
                    setSelectedCategory(v)
                }}
                placeholder={"Категория"}
                data={rootCategories}
                getChildren={fetchNodes}
                renderMenu={(children, menu, parentNode) => {
                    if (parentNode && parentNode.loading) {
                        return <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>Loading...</p>;
                    }
                    return menu;
                }}
            />
        )
        }
        </>
    );
};

export default CategoryCascader;