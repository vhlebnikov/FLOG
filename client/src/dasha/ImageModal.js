import { Modal, Button } from 'react-bootstrap';


function ImageModal(props) {

    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Изображение {props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={process.env.REACT_APP_API_URL + props.src} alt={"Фото загружается"} />
            </Modal.Body>
            <Modal.Footer>
                <Button className="mt-3"
                        variant="outline-success btn-expensive"
                        onClick={props.handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ImageModal;