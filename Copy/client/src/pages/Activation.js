import {useContext, useEffect} from "react";
import {Context} from "../index";
import {useNavigate, useParams} from "react-router-dom";
import {SHOP_PAGE} from "../utils/consts";
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";

const Activation = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const params = useParams();

    const validate = async () => {
        try {
            let data = jwt_decode(params.id)
            localStorage.setItem('token', params.id)
            user.setUser(data)
            user.setIsAuth(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        validate()
        navigate(SHOP_PAGE, {replace: true})
    }, [])

    return (
        <div>Вы успешно подтвердили свою почту</div>
    )
})

export default Activation;
