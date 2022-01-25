import React from 'react';
import Story from './Story';
import Job from './Job';
import { Row, Col } from 'reactstrap';

export default class General extends React.Component{
    render(){
        return(
            <>
            <Row>
                <Col>
                    <h3>View Stories from our members!</h3>
                    <Story/>
                </Col>
                <Col></Col>
                <Col>
                    <h3>View Job postings from our members!</h3>
                    <Job/>
                </Col>
            </Row>
            
            </>
        )
    }
}