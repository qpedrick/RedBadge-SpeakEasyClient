import React from 'react';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class Job extends React.Component {
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

    job() {
        return this.state.jobs.map((job) => (
                <>
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
                <br/>
                </>
        ))
    }
    
    render(){
        return(
            <>
            {this.job()}
            </>
        )
    }
}