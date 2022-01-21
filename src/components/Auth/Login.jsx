import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            role: '',
            sessionToken: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:7770/user/login", {
            method: "POST",
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({role: data.role});
            localStorage.setItem('role', data.role);
            this.setState({sessionToken: data.sessionToken});
            localStorage.setItem('sessionToken', data.sessionToken);
        })
        //.then((data) => localStorage.setItem('role', data.role))
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
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
                <Row>
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
                </Row>
                <Row>
                <Button type = 'submit' className = 'button' >Login</Button>
                </Row>
            </Form>
            </>
        )
    }
}
