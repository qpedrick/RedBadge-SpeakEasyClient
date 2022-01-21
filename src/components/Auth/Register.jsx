import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:7770/user/register", {
            method: "POST",
            body: JSON.stringify({
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <>
            <h1>Register</h1>
            <Form onSubmit={this.handleSubmit}>
                <Row>
                <Col>
                <FormGroup>
                    <Label htmlFor='firstName'>First Name</Label>
                </FormGroup>
                <FormGroup>
                    <Input type ='text' name = 'firstName' id = 'firstName' placeholder = 'First Name' value = {this.state.firstName } onChange = { this.handleChange }/>
                </FormGroup> 
                </Col>   
                <Col>
                <FormGroup>    
                    <Label htmlFor='lastName'>Last Name</Label>
                </FormGroup>
                <FormGroup>
                    <Input type ='text' name = 'lastName' id = 'lastName' placeholder = 'Last Name' value = {this.state.lastName } onChange = { this.handleChange }/>
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col>
                <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                </FormGroup>
                <FormGroup>
                    <Input type = 'email' name = 'email' id = 'email' placeholder = 'email' value = {this.state.email} onChange = {this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                </FormGroup>
                <FormGroup>
                    <Input type = 'password' name = 'password' id = 'password' placeholder = 'password' value = {this.state.password} onChange={this.handleChange}/>
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Button type = 'submit' className = 'button' >Sign Up</Button>
                </Row>
            </Form>
            </>
        )
    }
}
