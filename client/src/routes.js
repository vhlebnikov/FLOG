import {
    SHOP_PAGE,
    CREATE_AD_PAGE,
    PROFILE_PAGE,
    AD_PAGE,
    AUTH_PAGE, REGISTRATION_PAGE, NOT_FOUND_AD_PAGE, ADMIN_PANEL, MAIN_PAGE
} from "./utils/consts";
import Shop from "./pages/Shop";
import CreateAd from "./pages/CreateAd"
import Ad from "./pages/Ad"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Activation from "./pages/Activation"
import NotFoundAd from "./pages/NotFoundAd";
import AdminPanel from "./pages/AdminPanel";
import Main from "./pages/Main";

export const authRoutes = [
    {
        path: CREATE_AD_PAGE,
        Component: CreateAd
    },
    {
        path: PROFILE_PAGE + '/:id',
        Component: Profile
    }
]

export const publicRoutes = [
    {
      path: MAIN_PAGE,
      Component: Main
    },
    {
        path: '/activation/:id',
        Component: Activation
    },
    {
        path: SHOP_PAGE,
        Component: Shop
    },
    {
        path: AD_PAGE + '/:id',
        Component: Ad
    },
    {
        path: AUTH_PAGE,
        Component: Auth
    },
    {
        path: REGISTRATION_PAGE,
        Component: Auth
    },
    {
        path: NOT_FOUND_AD_PAGE,
        Component: NotFoundAd
    }
]

export const adminRoutes = [
    {
        path: ADMIN_PANEL,
        Component: AdminPanel
    }
]