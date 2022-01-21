import React from "react";
import Login from './Login';
import Register from "./Register";
import { Col, Container, Row } from 'reactstrap'
import './style.css'

export default class Auth extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Register/>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Login />
                    </Col>
                </Row>
            </Container>
            
        )
    }
}