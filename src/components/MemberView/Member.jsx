import React from 'react';
import Stories from './Stories';
import Jobs from './Jobs';

export default class Member extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        return(
            <>
            <br />
            <Stories props = {this.props.props}/>
            <br/>
            <Jobs props = {this.props.props}/>
            </>
        )
    }
}