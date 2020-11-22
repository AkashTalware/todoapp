import React, { Component } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import {connect} from 'react-redux'
import {RiDeleteBinLine} from 'react-icons/ri'
import {FaFilter} from 'react-icons/fa'

class View extends Component{
    constructor(props){
        super(props)
        this.state={
            sortBy:'asc',
            filter:'',
            accordingTo:'',
            todolist:this.props.todoArray.slice(0),
            filteredArray:[],
            completed:[],
            sortedItemArray:[],
            pastdue:[],
            incomplete:[]
        }
    }

    componentDidMount(){

        if (!localStorage.getItem('name')){
            this.props.history.push('/login')
        }
        else{
            console.log(this.props.authDetails,'View.js component mounted')

            //Sorting for date
            const sortedItems= this.state.todolist.sort((a,b)=>{
                const isreversed= (this.state.sortBy==='asc')? 1:-1
                return isreversed * a.todoDate.localeCompare(b.todoDate)
            })
            console.log(sortedItems, 'Sorted ones')

            //complete
            const completedItems=this.props.todoArray.filter((item, index)=>{
                if(item.checkboxstatus){
                    return true
                }
                else{
                    return false
                }
            })

            //incomplete
            const incomplete=this.props.todoArray.filter(item=>{
                if(!item.checkboxstatus){
                    return true
                }
                else{
                    return false
                }
            })

            //Past due
            const pastDue= this.props.todoArray.filter(item=>{
                if(new Date(item.todoDate) < new Date()){
                    return true
                }
                else{
                    return false
                }
            })
            console.log(pastDue, 'Past Due')

            this.setState({completed:completedItems, sortedItemArray:sortedItems, pastdue:pastDue, incomplete:incomplete})
        }
    }

    arrayMap=(item,index)=>{
        return(
            <div key={index}>
                <Container>
                    <Card style={{borderThickness:'3px'}} border={new Date(item.todoDate) < new Date() ? "warning border--3"  : ""} 
                                            className="mx-5 my-3 " 
                                            bg='dark'
                                            text='white'>
                        <span className={item.checkboxstatus ? "strikethrough" : ""}>
                            <Card.Header as="h4">
                                <Row className="mx-3">
                                    {item.task}
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
                                        <Col sm='9'>{item.todoDate}</Col>
                                    </Row>
                                </Card.Text>
                                </span>
                                <Row className='mt-3'>
                                    <Button className='mx-2' variant='outline-danger' onClick={()=>this.deleteTask(item.id,index)}><RiDeleteBinLine className="mr-2 my-auto"/> Remove</Button>
                                </Row>    
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )}

    deleteTask=(id,ind)=>{
        this.props.deleteTask(this.findMyItem(this.props.todoArray,id))

        this.setState({filteredArray: [...this.state.filteredArray.slice(0,ind), ...this.state.filteredArray.slice(ind+1)], 
                        todolist:this.props.todoArray.slice(0), 
                        completed:[...this.state.completed.slice(0, this.findMyItem(this.state.completed,id)), ...this.state.completed.slice(this.findMyItem(this.state.completed,id)+1)],
                        sortedItemArray:[...this.state.sortedItemArray.slice(0, this.findMyItem(this.state.sortedItemArray,id)), ...this.state.sortedItemArray.slice(this.findMyItem(this.state.sortedItemArray,id)+1)],
                        incomplete:[...this.state.incomplete.slice(0, this.findMyItem(this.state.incomplete,id)), ...this.state.incomplete.slice(this.findMyItem(this.state.incomplete,id)+1)],
                        pastdue:[...this.state.pastdue.slice(0, this.findMyItem(this.state.pastdue,id)), ...this.state.pastdue.slice(this.findMyItem(this.state.pastdue,id)+1)]
        })
    }

    findMyItem=(array,id)=>{
        let findex=-1
        const object=array.find((item, index)=>{
            if (item.id===id){
                findex=index
                return true
            }
            else{
                return false
            }
        })
        console.log(object, "Deleting this object")
        return findex
    }

    showthisArray=(casename)=>{
        switch(casename){
            case 'order':this.setState({filteredArray:this.state.sortedItemArray, accordingTo:'The tasks acoording to Ascending Order of Date'});
            break;
            case 'completed': this.setState({filteredArray:this.state.completed, accordingTo:'These are the Completed Taks'}) ;
            break;
            case 'incomplete': this.setState({filteredArray:this.state.incomplete, accordingTo :'These Tasks Are Incomplete'}) ;
            break;
            case 'pastdue': this.setState({filteredArray:this.state.pastdue, accordingTo :'These Tasks Are Past Their Due Dates'}) ;
            break;
            default: this.setState({filteredArray:this.props.todoArray, accordingTo:'All Tasks'}); 
        }
        console.log('Apply Filter Clicked')
    }

    render(){
        console.log(this.props.todoArray, 'Entire array')
        console.log(this.state, 'State')
        return(
            <>
                <Container className='m-3'>
                    <h3 className='my-auto' style={{textAlign:'center'}}>View Your Tasks by subscribing to one of the following filters!</h3>
                    <br/>
                    <Form.Group >
                        <Row>
                            <Col></Col>
                            <Col sm='2' className='my-auto'>
                                <Form.Label><FaFilter /> Filter</Form.Label>
                            </Col>
                            <Col sm='7'>
                                
                                <Form.Control as="select" onChange={(event)=>this.setState({filter:event.target.value})}>
                                    <option selected={true} value="viewAll">View All</option>
                                    <option value="order">Date</option>
                                    <option value="completed" >Completed</option>
                                    <option value="incomplete">Incomplete</option>
                                    <option value="pastdue">Due Date Passed</option>
                                </Form.Control>
                            </Col>
                            <Col sm='2'>
                                <Button variant="outline-success" onClick={()=>{this.showthisArray(this.state.filter)}}>Apply Filter</Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Form.Group>
                </Container>

                <Container className='m-auto'>
                    <h5 style={{textAlign:'center'}}>{this.state.accordingTo}</h5>
                    {this.state.filteredArray.map((item,index)=>this.arrayMap(item,index))}
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
        deleteTask:(val)=>{dispatch({type:'DELETE_TASK', payload:val})},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(View)