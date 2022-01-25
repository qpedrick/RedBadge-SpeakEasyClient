import React from 'react';
import {Form, FormGroup, Row, Label, Input, Button, Col, Card, CardBody, CardTitle, CardText} from 'reactstrap';
import './style.css'

export default class Stories extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            newTitle: '',
            newDescription: '',
            sessionToken: this.props.props,
            myStories: []
        }
    }

        handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:7770/story/create", {
            method: "POST",
            body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => this.setState({myStories: data}))
        .catch(err => console.log(err))
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getMyStories = () => {
        fetch('http://localhost:7770/story/mine', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => 
        {//console.log(data)
        this.setState({myStories: data})})
        .catch(err => console.log(err))
    }

    deleteStory = (event, storyId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/story/${storyId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            this.getMyStories()
        })
        .catch(err => console.log(err))
    }

    updateStory = (event, storyId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/story/${storyId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            }),
            body: JSON.stringify({
                title: this.state.newTitle,
                description: this.state.newDescription
            })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(() => this.getMyStories())
        .catch(err => console.log(err))
    }

    displayMyStoryies() {
        //console.log(this.state.myStories)
        return this.state.myStories.map((story) => (
            // <Col md = '4' key = {story.id}>
                <Card key = {story.id}>
                    <CardBody>
                        <CardTitle>{story.title}</CardTitle>
                        <CardText>{story.description}</CardText>
                    </CardBody>
                    <Row>
                    <Col>
                    <Button color = 'primary' onClick={(event) => this.updateStory(event, story.id)}>Update Story</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                    <Button color = 'danger' onClick={(event) => this.deleteStory(event, story.id)}>Delete Story</Button>
                    </Col>
                    </Row>
                </Card>
            // {/* </Col> */}
        ))
    }
    
    componentDidMount() {
        return this.getMyStories()
    }

    render(){
        return(
            <>
            {/* <h2>View your stories here:</h2>
            <Row>{this.displayMyStoryies()}</Row> */}
            <Row style = {{paddingTop: '5%', paddingBottom: '5%', background: '#E6E1C5'}}>
                <Col style = {{border: '5px solid black', marginLeft: '3%'}}>
                <h3>Create a new Story here:</h3>
                    <Form onSubmit = {this.handleSubmit}>
                    <Row>
                        <FormGroup>
                            <Label htmlFor='title'>Title</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type = 'text' name = 'title' id = 'title' placeholder = 'Title' value = {this.state.title} onChange = {this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='description'>Description</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type = 'description' name = 'description' id = 'description' placeholder = 'Description' value = {this.state.description} onChange={this.handleChange}/>
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
                    <h3>View your stories here:</h3>
                    <Row>{this.displayMyStoryies()}</Row>
                </Col>
                <Col style = {{border: '5px solid black', marginRight: '3%'}}>
                <h3>Edit a Story here:</h3>
                    <Form>
                    <Row>
                        <FormGroup>
                            <Label htmlFor='newTitle'>New Title</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type = 'text' name = 'newTitle' id = 'newTitle' placeholder = 'New Title' value = {this.state.newTitle} onChange = {this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='newdescription'>New Description</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type = 'textbox' name = 'newDescription' id = 'newDescription' placeholder = 'New Description' value = {this.state.newDescription} onChange={this.handleChange}/>
                        </FormGroup>
                        </Row>
                        <p>Once you fill in the new information you can click update story on the story you would like to edit.</p>
                    </Form>
                </Col>
            </Row>
            
            </>
        )
    }
}