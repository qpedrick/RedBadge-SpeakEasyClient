import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class GenInfo extends React.Component {


    render(){
        return(
            <Container style = {{background: '#CDDDDD'}}>
                <Row>
                    <Col>
                        <h3 style = {{textAlign: 'left'}}>Welcome to our website!</h3>
                        <p style = {{textAlign: 'right'}}>We are glad to have you here. This website is a landing page for prospective members and the general public who would like to learn more about our space.</p>
                        <br/>
                        <p style = {{textAlign: 'left', fontStyle: 'italic'}}>If this is your first time here:</p>
                        <p style = {{textAlign: 'right'}}>Please register for a new account.  Here you will be able to view our members' stories and job postings!</p>
                        <p style = {{textAlign: 'left', fontStyle: 'italic'}}>Once you sign up:</p>
                        <p style = {{textAlign: 'right'}}>Once you sign up, you will be able to create your own stories and share job postings!</p>
                        <h6>Thank god this deployed</h6>
                    </Col>
                </Row>
            </Container>
        )
    }
}