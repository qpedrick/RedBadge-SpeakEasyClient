import React from 'react';
import { Row, Col, Button } from 'reactstrap';

export default class Users extends React.Component {
    constructor(){
        super();
        this.state = {
            users: []
        }
    }

    getUsers = () => {
        fetch('http://localhost:7770/user/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            this.setState({users: data})})
        }

    componentDidMount = () => {
        this.getUsers()
    }

    deleteUser = (event, userId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/user/${userId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            this.getUsers()
        })
        .catch(err => console.log(err))
    }

    makeMember = (event, userId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/user/${userId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                user: {
                role: 'member'
                }
            })
        })
        .then((res) => res.json())
        //.then((data) => console.log(data))
        .then(() => this.getUsers())
        .catch(err => console.log(err))
    }

    makeGeneral = (event, userId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/user/${userId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                user: {
                role: 'general'
                }
            })
        })
        .then((res) => res.json())
        //.then((data) => console.log(data))
        .then(() => this.getUsers())
        .catch(err => console.log(err))
    }

    makeAdmin = (event, userId) => {
        event.preventDefault()
        fetch(`http://localhost:7770/user/${userId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                user: {
                role: 'admin'
                }
            })
        })
        .then((res) => res.json())
        //.then((data) => console.log(data))
        .then(() => this.getUsers())
        .catch(err => console.log(err))
    }

    user() {
        return this.state.users.map((user) => (
                <Row key = {user.id}>
                    <Col md = '2'>
                    {user.firstName}
                    </Col>
                    <Col md = '2'>
                    {user.lastName}
                    </Col>
                    <Col md = '2'>
                    {user.email}
                    </Col>
                    <Col md = '2'>
                    {user.role}
                    </Col>
                    <Col>
                        <Button color = 'primary' onClick={(event) => this.makeMember(event, user.id)}>Member</Button>
                    </Col>
                    <Col>
                        <Button color = 'secondary' onClick={(event) => this.makeGeneral(event, user.id)}>General</Button>
                    </Col>
                    <Col>
                        <Button color = 'warning' onClick={(event) => this.makeAdmin(event, user.id)}>Admin</Button>
                    </Col>
                    <Col>
                        <Button color = 'danger' onClick={(event) => this.deleteUser(event, user.id)}>Delete User</Button>
                    </Col>
                </Row>
        ))
    }
    
    render(){
        return(
            <>
            <h3>List of Users</h3>
            {this.user()}
            </>
        )
    }
    }
