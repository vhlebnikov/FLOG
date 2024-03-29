import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {SHOP_PAGE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return(
        <Routes>
            {user.isAuth && user.user.role === 'ADMIN' && adminRoutes.map(({path, Component}) =>
                <Route key = {path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key = {path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path , Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            <Route path='*' element={<Navigate to={SHOP_PAGE}/>} />
        </Routes>
    );
});

export default AppRouter;