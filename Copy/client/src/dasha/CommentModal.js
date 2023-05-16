import { Modal, Button } from 'react-bootstrap';
import {AUTH_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";


function CommentModal(props) {
    const navigate = useNavigate()

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button className="mt-3"
                        variant="outline-success btn-expensive"
                        onClick={() => navigate(AUTH_PAGE)}>
                    Авторизироваться
                </Button>
                <Button className="mt-3"
                        variant="outline-success btn-expensive"
                        onClick={props.handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CommentModal;