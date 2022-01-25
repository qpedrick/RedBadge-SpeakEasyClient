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
            <Row style = {{background: '#abcdef'}}>
                <Col md = '9'>
                    <h1 style = {{fontSize: '75px', textAlign: 'left'}}>The Speak Easy</h1>
                </Col>
                <Col md = '3'>
                    <Button onClick={this.clearLocal}>Logout</Button>
                </Col>
            </Row>
            </>
        )
    }
}