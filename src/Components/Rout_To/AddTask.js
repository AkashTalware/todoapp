import React, { Component } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { MdDescription } from 'react-icons/md'
import {connect} from 'react-redux'
import {CgGoogleTasks} from 'react-icons/cg'

class AddTask extends Component{
    constructor(props){
        super(props)
        this.state={
            task:'',
            desc:'',
            date: '',
        }
    }

    componentDidMount(){
        if (!localStorage.getItem('name')){
            this.props.history.push('/login')
        }
        else{
            console.log(this.state, this.props.authDetails,'componentDidMount')
        }
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    addThisTask=()=>{
        this.props.addTask({id:Math.random() , task:this.state.task,
                        desc:this.state.desc, 
                        todoDate: this.state.date,
                        checkboxstatus: false,})
                        
        this.setState({task:'',
                        desc:'',
                        date: '',})
    }
    
    render(){
        const {task, desc, date}=this.state
        return(
            <>
                <Container className='m-5' style={{width:'90%'}}>
                    <Form.Group>
                        <Form.Label>So what are you planning to do?</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                        <InputGroup.Text><CgGoogleTasks/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control  name="task" value={task} type="text" placeholder="Type your task here" onChange={(event)=>{this.handleChange(event)}} autoFocus={true}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><MdDescription/> </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control  name="desc" value={desc} as="textarea" placeholder="Description" onChange={(event)=>{this.handleChange(event)}}/>
                        </InputGroup>
                    </Form.Group>

                    
                    <Form.Group as={Row}>
                        <Col sm='6'>
                            <Form.Label>Select the Date for the task</Form.Label>
                            <Form.Control type="date" value={date} name="date" onChange={(event)=>{this.handleChange(event)}}/>
                        </Col>
                    </Form.Group>
                    <Button variant="outline-primary" onClick={()=>{this.addThisTask()}}>Add Task</Button>
                </Container>
            </>
        )
    }
}

const mapStateToProps=(state,props)=>{
    return{
        todoArray: state.todoArray,
        authDetails: state.authDetails.name!=null ? state.authDetails:false
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return{
        addTask:(val)=>dispatch({type:'ADD_TASK', payload:val}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTask)