import React from 'react';
import { Button, Col, Row, Card, CardTitle, CardBody, CardText } from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class AdminStories extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            stories: []
        }
    }
    
    getStories = () => {
        fetch(`${APIURL}story/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            this.setState({stories: data})})
        }

    deleteStory = (event, storyId) => {
        event.preventDefault()
        fetch(`${APIURL}story/admin/${storyId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            this.getStories()})
    }

    componentDidMount() {
        return this.getStories()
    }

    story() {
        return this.state.stories.map((story) => (
            <Col style = {{paddingLeft: '2%', paddingRight: '2%'}} md = '4' key = {story.id}>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5>{story.title}</h5>
                            </CardTitle>
                        <CardText>{story.description}</CardText>
                    </CardBody>
                </Card>
                <Button color = 'danger' onClick = {(event) => {this.deleteStory(event, story.id)}}>Delete</Button>
            </Col>
        ))
    }
    
    render(){
        return(
            <>
            <h3>User Stories</h3>
            <Row>
            {this.story()}
            </Row>
            </>
        )
    }
}