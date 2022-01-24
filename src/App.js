import './App.css';
import Auth from './components/Auth/Auth';
import Splash from './components/Splash/Splash';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Member from './components/MemberView/Member';
import General from './components/GeneralView/General';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      sessionToken: '',
      role: '',
    }
  }

  protect() {
      if(localStorage.getItem('role') === 'general'){
        return(
          <>
          <h1>General View</h1>
          <General/>
          </>
        )
      } else if (localStorage.getItem('role') === 'member') {
        return(
          <>
        <h1>Member View</h1>
        <Member props = {this.state.sessionToken}/>
        </>)
      } else if (localStorage.getItem('role') === 'admin') {
        return(<h1>Admin View</h1>)
      } else {
        return (<Auth props = {this.session}/>)
      }
    }

  session = () => {
    this.setState({
    sessionToken: localStorage.getItem('sessionToken'),
    role: localStorage.getItem('role')
  })
  }

  // componentDidUpdate(){
  //   return this.protect()
  // }
  
  render(){
  return (
    <>
      <Splash props = {this.session}/>
      {this.protect()}
    </>
  );
  }
}

export default App;
