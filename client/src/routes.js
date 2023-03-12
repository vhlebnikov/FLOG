import Admin from "./pages/Admin";
import {
    ACCOUNT_ROUTE,
    AD_ROUTE,
    ADMIN_ROUTE,
    FAVOURITES_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Favourites from "./pages/Favourites";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import AdPage from "./pages/AdPage";
import Account from "./pages/Account";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: FAVOURITES_ROUTE,
        Component: Favourites
    },
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: AD_ROUTE + '/:id',
        Component: AdPage
    }
]