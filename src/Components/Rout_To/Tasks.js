import React, { Component } from 'react'
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import {connect} from 'react-redux'
import {GrEdit} from 'react-icons/gr'
import {RiDeleteBinLine} from 'react-icons/ri'
import {MdDescription} from 'react-icons/md'
import {CgGoogleTasks} from 'react-icons/cg'

class Tasks extends Component{
    constructor(props){
        super(props)
        this.state={
            editItem:false,
            editIndex:-1,
            task:'',
            desc:'',
            date: '',
            completedTasks:[]
        }
    }

    componentDidMount(){
        if (!localStorage.getItem('name')){
            this.props.history.push('/login')
        }
        else{
            console.log(this.state, this.props.authDetails,' task.js componentDidMount')
        }
    }

    handleEdit=(ind)=>{
        const editItem= this.props.todoArray[ind]
        console.log(editItem, 'handleEdit')
        this.setState({editItem:true, editIndex:ind, task: editItem.task, desc:editItem.desc,
            date:editItem.todoDate})
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    editThisTask=(ind)=>{
        this.props.editTask({index:ind,task: {task:this.state.task,
                        desc:this.state.desc,
                        todoDate: this.state.date, checkboxstatus: false}
                    })
        this.setState({editItem:false,
                    editIndex:-1,
                    task:'',
                    desc:'',
                    date: ''})
    }

    handleCheckbox=(ind)=>{
        this.props.checkbox(ind)
    }

    render(){
        console.log( this.props.completedItemsList, this.props.todoArray,'Tasks.js')
        const{task,desc,date}=this.state
        console.log(date,this.state ,'Date')
        return(
            <>
                <div>
                    {this.state.editItem?
                    <div>
                        <Container className='m-5 my-auto border-dark' style={{width:'80%'}}>
                            <Form.Group>
                                <Form.Label>Task Heading</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><CgGoogleTasks/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="task" value={task} type="text" placeholder="Type your task here" onChange={(event)=>{this.handleChange(event)}} autoFocus={true}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><MdDescription/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control  name="desc" value={desc} as="textarea" placeholder="Type the Description of task" onChange={(event)=>{this.handleChange(event)}}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm="6">
                                    <Form.Label>Due Date for the task</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="date" value={date} name="date" onChange={(event)=>{this.handleChange(event)}}/>
                                    </InputGroup>
                                    
                                </Col>
                            </Form.Group>
                            <Button variant="outline-primary" onClick={()=>{this.editThisTask(this.state.editIndex)}}>Done</Button>
                        </Container>
                    </div>
                    :<></>
                    }
                    <h3 className='my-auto' style={{textAlign:'center', padding:'2px'}}>All the tasks can be viewed here.</h3>
                    {this.props.todoArray.map((item,index)=>{
                        return(
                            <div key={index}>
                                <Card border={new Date(item.todoDate) < new Date() ? "warning"  : ""} 
                                        className="mx-5 my-3" 
                                        bg='dark'
                                        text='white'>
                                    <span className={item.checkboxstatus ? "strikethrough" : ""}>
                                        <Card.Header as="h4">
                                            <Row className="mx-3">
                                                <Form.Check className='my-auto' type = "checkbox" defaultChecked={item.checkboxstatus}onClick={()=>this.handleCheckbox(index)}/>
                                                <span className='my-auto'>{item.task}</span>
                                            </Row>
                                        </Card.Header>
                                    </span>
                                    <Card.Body>
                                        <span className={item.checkboxstatus ? "strikethrough" : ""}>
                                            <Card.Text>
                                                <Row>
                                                    <Col sm='3'><strong>Description</strong>:</Col>
                                                    <Col sm='9'>{item.desc}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='3'><strong>To be done by</strong>:</Col>
                                                    <Col sm='9'> {item.todoDate} </Col>
                                                </Row>
                                            </Card.Text>
                                        </span>
                                        {this.state.editItem? '':
                                        <>
                                            <Row className='mt-3'>
                                                <Button className='mx-2' variant='outline-success' onClick={()=>this.handleEdit(index)}> <GrEdit className="mr-2 my-auto" color="white"/>Edit</Button>
                                                <Button className='mx-2' variant='outline-danger'  onClick={()=>this.props.deleteTask(index)}><RiDeleteBinLine className="mr-2 my-auto"/> Remove</Button>
                                                {new Date(item.todoDate) < new Date() ? <Alert variant='warning' className='my-auto ml-5'>Due Date passed!</Alert>  : <></>}
                                            </Row>
                                        </>
                                        }    
                                    </Card.Body>
                                </Card>    
                            </div>
                        )
                    })}
                </div>
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
        deleteTask:(val)=>{dispatch({type:'DELETE_TASK', payload:val})},
        editTask:(val)=>dispatch({type:'EDIT_TASK', payload:val}),
        checkbox:(val)=>{dispatch({type:'CHECKBOX', payload:val})}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Tasks)