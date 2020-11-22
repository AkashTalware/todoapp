import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import LogOut from './Components/Header/LogOut';
import AddTask from './Components/Rout_To/AddTask';
import HomePage from './Components/Rout_To/HomePage';
import Login from './Components/Rout_To/Login';
import SignUp from './Components/Rout_To/SignUp';
import Tasks from './Components/Rout_To/Tasks';
import View from './Components/Rout_To/View';
import { Container } from 'react-bootstrap';

class App extends Component{

  componentDidMount=()=>{
    this.props.pageLoaded()
  }

  render(){
    return(
      <>
        <BrowserRouter>
          <Container style={{width:'100%'}}>
            <Header/>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/login' component={Login}/>
              <Route exact path='/signup' component={SignUp}/>
              <Route path='/tasks' component={Tasks}/>
              <Route path='/addtask' component={AddTask}/>
              <Route path='/view' component={View}/>
              <Route path='/logout' component={LogOut}/>
            </Switch>
          </Container>
        </BrowserRouter>
      </>
    )
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    pageLoaded:()=>dispatch({type:'PAGE_LOADED'})
  }
}

export default connect(null,mapDispatchToProps)(App);
