import Title from "./Title";
import React from 'react';

export default class Splash extends React.Component {
    render() {
        return(
            <>
            <Title props = {this.props.props}/>
            </>
        )
    }
}