import React from 'react';
import CreateForm from "../components/CreateForm";
import {Container, Row} from "react-bootstrap";

const CreateAd = () => {
    return (
        <Container>
            <Row className="mt-3">
                <CreateForm/>
            </Row>

        </Container>
    );
};

export default CreateAd;