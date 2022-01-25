import React from 'react';
import { Button, Col, Row, Card, CardTitle, CardBody, CardText } from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class AdminJobs extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            jobs: []
        }
    }
    
    getJobs = () => {
        fetch(`${APIURL}job/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            this.setState({jobs: data})})
        }
            

    componentDidMount() {
        return this.getJobs()
    }

    deleteJob = (event, jobId) => {
        event.preventDefault()
        fetch(`${APIURL}job/admin/${jobId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then(() => {
            //console.log(data);
            this.getJobs()})
    }

    job() {
        return this.state.jobs.map((job) => (
                <Col  style = {{paddingLeft: '2%', paddingRight: '2%'}} md = '4' key = {job.id}>
                <Card>
                    <CardBody>
                        <CardTitle><h5>{job.company}</h5></CardTitle>
                        <CardText>
                            {job.jobtitle} <br/>
                            {job.description} <br />
                            {job.link}
                        </CardText>
                    </CardBody>
                </Card>
                <Button color = 'danger' onClick = {(event) => {this.deleteJob(event, job.id)}}>Delete</Button>
                </Col>
        ))
    }
    
    render(){
        return(
            <>
            <h3>User Jobs</h3>
            <Row>
            {this.job()}
            </Row>
            </>
        )
    }
}