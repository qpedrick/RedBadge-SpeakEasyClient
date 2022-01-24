import React from 'react';
import {Form, FormGroup, Row, Label, Input, Button, Col, Card, CardBody, CardTitle, CardText} from 'reactstrap'

export default class Jobs extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            company: '',
            jobtitle: '',
            description: '',
            link: '',
            sessionToken: this.props.props,
            myJobs: []
        }
    }

        handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:7770/job/create", {
            method: "POST",
            body: JSON.stringify({
                    company: this.state.company,
                    jobtitle: this.state.jobtitle,
                    description: this.state.description,
                    link: this.state.link
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
        console.log(data)
        this.getMyJobs()})
        .catch(err => console.log(err))
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getMyJobs = () => {
        fetch('http://localhost:7770/job/mine', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => 
        {console.log(data)
        this.setState({myJobs: data})})
        .catch(err => console.log(err))
    }

    deleteJob = (event, jobId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/job/${jobId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            this.getMyJobs()
        })
        .catch(err => console.log(err))
    }

    updateStory = (event, jobId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/story/${jobId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            }),
            body: JSON.stringify({
                company: this.state.company,
                jobtitle: this.state.title,
                description: this.state.description,
                link: this.state.link
            })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(() => this.getMyJobs())
        .catch(err => console.log(err))
    }

    displayMyJobs() {
        //console.log(this.state.myStories)
        return this.state.myJobs.map((job) => (
            <Col md = '4' key = {job.id}>
                <Card>
                    <CardBody>
                        <CardTitle>{job.company}</CardTitle>
                        <CardText>
                            {job.jobtitle}
                            <br></br>
                            {job.description}
                            <br></br>
                            {job.link}</CardText>
                    </CardBody>
                    <Row>
                    <Col>
                    <Button onClick={(event) => this.updateJob(event, job.id)}>Update Story</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                    <Button onClick={(event) => this.deleteJob(event, job.id)}>Delete Story</Button>
                    </Col>
                    </Row>
                </Card>
            </Col>
        ))
    }
    
    componentDidMount() {
        return this.getMyJobs()
    }

    render(){
        return(
            <>
            <h2>Create a new Job Posting here:</h2>
            <Form onSubmit = {this.handleSubmit}>
            <Row>
                <FormGroup>
                    <Label htmlFor='company'>Company</Label>
                </FormGroup>
                <FormGroup>
                    <Input type = 'text' name = 'company' id = 'company' placeholder = 'Company' value = {this.state.company} onChange = {this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='jobtitle'>Job Title</Label>
                </FormGroup>
                <FormGroup>
                    <Input type = 'text' name = 'jobtitle' id = 'jobtitle' placeholder = 'jobtitle' value = {this.state.jobtitle} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='description'>Description</Label>
                </FormGroup>
                <FormGroup>
                    <Input type = 'text' name = 'description' id = 'description' placeholder = 'description' value = {this.state.description} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='link'>Link to posting</Label>
                </FormGroup>
                <FormGroup>
                    <Input type = 'text' name = 'link' id = 'link' placeholder = 'link' value = {this.state.link} onChange={this.handleChange}/>
                </FormGroup>
                </Row>
                <Row>
                <Button type = 'submit' className = 'button' >Submit Job Posting</Button>
                </Row>
            </Form>
            <br></br>
            <h2>View your job postings here:</h2>
            <Row>{this.displayMyJobs()}</Row>
            </>
        )
    }
}