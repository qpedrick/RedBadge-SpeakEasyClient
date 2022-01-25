import React from 'react';
import { Row, Card, CardTitle, CardBody, CardText } from 'reactstrap';

export default class Job extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            jobs: []
        }
    }
    
    getJobs = () => {
        fetch('http://localhost:7770/job/', {
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

    job() {
        return this.state.jobs.map((job) => (
                <Card key = {job.id}>
                    <CardBody>
                        <CardTitle>{job.company}</CardTitle>
                        <CardText>
                            {job.jobtitle} <br/>
                            {job.description} <br />
                            {job.link}
                        </CardText>
                    </CardBody>
                </Card>
        ))
    }
    
    render(){
        return(
            <Row>
            {this.job()}
            </Row>
        )
    }
}