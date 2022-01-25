import React from 'react';
import AdminUsers from './AdminUsers';
import AdminStories from './AdminStories';
import AdminJobs from './AdminJobs';

export default class Admin extends React.Component{


    render() {
        return(
            <div style = {{background: '#CDDDDD'}}>
            <AdminUsers />
            <br/>
            <AdminStories />
            <br/>
            <AdminJobs />
            </div>
        )
    }
}