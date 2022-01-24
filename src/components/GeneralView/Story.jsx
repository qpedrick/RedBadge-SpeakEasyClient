import React from 'react';
import { Col, Row, Card, CardTitle, CardBody, CardText } from 'reactstrap';

export default class Story extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            stories: []
        }
    }
    
    getStories = () => {
        fetch('http://localhost:7770/story/', {
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
            

    componentDidMount() {
        return this.getStories()
    }

    story() {
        return this.state.stories.map((story) => (
            <Col md = '4' key = {story.id}>
                <Card>
                    <CardBody>
                        <CardTitle>{story.title}</CardTitle>
                        <CardText>{story.description}</CardText>
                    </CardBody>
                </Card>
            </Col>
        ))
    }
    
    render(){
        return(
            <Row>
            {this.story()}
            </Row>
        )
    }
}