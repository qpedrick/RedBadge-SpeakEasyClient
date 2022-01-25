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
            newCompany: '',
            newJobtitle: '',
            newDescription: '',
            newLink: '',
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
        .then((data) => this.setState({myJobs: data}))
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

    updateJob = (event, jobId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/job/${jobId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            }),
            body: JSON.stringify({
                company: this.state.newCompany,
                jobtitle: this.state.newJobtitle,
                description: this.state.newDescription,
                link: this.state.newLink
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
                <Card key = {job.id}>
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
                    <Button color = 'primary' onClick={(event) => this.updateJob(event, job.id)}>Update Job</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                    <Button color = 'danger' onClick={(event) => this.deleteJob(event, job.id)}>Delete Job</Button>
                    </Col>
                    </Row>
                </Card>
        ))
    }
    
    componentDidMount() {
        return this.getMyJobs()
    }

    render(){
        return(
            <>
            <Row style = {{paddingTop: '5%', paddingBottom: '5%', background: '#E6E1C5'}}>
                <Col style = {{border: '5px solid black', marginLeft: '3%'}}>
                <h4>Create a new Job Posting here:</h4>
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
                        <Col></Col>
                        <Col>
                            <Button color = 'success' type = 'submit' className = 'button' >Submit Job Posting</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
                </Col>
                <Col style = {{marginLeft: '5%', marginRight: '5%', border: '5px solid black'}}>
                    <h3>View your job postings here:</h3>
                    <Row>{this.displayMyJobs()}</Row>
                </Col>
                <Col style = {{border: '5px solid black', marginRight: '3%'}}>
                <h4>Edit a Job Posting here:</h4>
                <Form>
                    <Row>
                    <FormGroup>
                        <Label htmlFor='newCompany'>New Company</Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type = 'text' name = 'newCompany' id = 'newCompany' placeholder = 'New Company' value = {this.state.newCompany} onChange = {this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='newJobtitle'>New Job Title</Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type = 'text' name = 'newJobtitle' id = 'newJobtitle' placeholder = 'New Job Title' value = {this.state.newJobtitle} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='newDescription'>New Description</Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type = 'text' name = 'newDescription' id = 'newDescription' placeholder = 'New Decription' value = {this.state.newDescription} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='newLink'>New Link to posting</Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type = 'text' name = 'newLink' id = 'newLink' placeholder = 'New Link' value = {this.state.newLink} onChange={this.handleChange}/>
                    </FormGroup>
                    </Row>
                    <p>After entering new information for all fields, click on the Update Job button of the corresponding post to update</p>
                </Form>
                </Col>
                </Row>
            </>
        )
    }
}