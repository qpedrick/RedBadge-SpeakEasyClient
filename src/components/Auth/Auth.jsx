import React from "react";
import Login from './Login';
import Register from "./Register";
import { Col, Container, Row } from 'reactstrap'
import './style.css'

export default class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Register props = {this.props.props}/>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <Login props = {this.props.props}/>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}