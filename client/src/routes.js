import {
    SHOP_PAGE,
    CREATE_AD_PAGE,
    PROFILE_PAGE,
    AD_PAGE,
    EDIT_PROFILE_PAGE,
    AUTH_PAGE, REGISTRATION_PAGE
} from "./utils/consts";
import Shop from "./pages/Shop";
import CreateAd from "./pages/CreateAd"
import Ad from "./pages/Ad"
import Auth from "./pages/Auth"
import EditProfile from "./pages/EditProfile"
import Profile from "./pages/Profile"
import Activation from "./pages/Activation"

export const authRoutes = [
    {
        path: CREATE_AD_PAGE,
        Component: CreateAd
    },
    {
        path: PROFILE_PAGE,
        Component: Profile
    },
    {
        path: EDIT_PROFILE_PAGE,
        Component: EditProfile
    }
]

export const publicRoutes = [
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
]