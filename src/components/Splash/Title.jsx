import React from 'react';
import {Col, Button, Row} from 'reactstrap'


export default class Title extends React.Component {

    clearLocal = (event) => {
        localStorage.clear();
        this.props.props()
    }


    render() {
        return(
            <>
                <h1>The Speak Easy</h1>
            <Row>
                <Col md = '9'>
                </Col>
                <Col md = '3'>
                    <Button onClick={this.clearLocal}>Logout</Button>
                </Col>
            </Row>
            </>
        )
    }
}