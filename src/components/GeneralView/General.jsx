import React from 'react';
import Story from './Story'

export default class General extends React.Component{
    render(){
        return(
            <>
            <h1>View Stories from our members!</h1>
            <Story/>
            </>
        )
    }
}