import React from "react";
import Login from './Login';
import Register from "./Register";
import { Col, Container, Row } from 'reactstrap'
import './style.css'
import GenInfo from "./GenInfo";

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
                        <GenInfo/>
                    </Col>
                    <Col style = {{background: '#CDDDDD', margin: '2%'}}>
                        <Register props = {this.props.props}/>
                    </Col>
                    <Col style = {{background: '#CDDDDD'}}>
                        <Login props = {this.props.props}/>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}