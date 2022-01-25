import React from 'react';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class Story extends React.Component {
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
            

    componentDidMount() {
        return this.getStories()
    }

    story() {
        return this.state.stories.map((story) => (
            <>
                <Card key = {story.id}>
                    <CardBody>
                        <CardTitle>{story.title}</CardTitle>
                        <CardText>{story.description}</CardText>
                    </CardBody>
                </Card>
            <br/>
            </>
        ))
    }
    
    render(){
        return(
            <>
            {this.story()}
            </>
        )
    }
}