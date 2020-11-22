import React from 'react'
import { Col, Form, Button, Row, Container, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

function SignUp(props) {
    const {register, errors, handleSubmit}= useForm()

    const handleAuth = (evt) => {
        console.log(evt)
    }

    return (
        <div>
            <Container className='m-5' style={{ width: '90%', border: '2px black' }}>
                <h4 className='mb-4'>Sign Up Here.</h4>
                <Form onSubmit={handleSubmit(handleAuth)}>
                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="3">Enter Your Full Name</Form.Label>
                        <Col sm='9'>
                            <Form.Control name="name" type='text' placeholder="Type Your First Name"
                                ref={register({required:{value:true, message:'Name is required'}})} />
                            {errors.name && (
                                <Alert variant="danger">{errors.name.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="3">Enter Email ID</Form.Label>
                        <Col sm='9'>
                            <Form.Control name="email" type='email' placeholder="Type Email"
                                ref={register({
                                    required:{value:true, message:'Email is required'}
                                    })} />
                            {errors.email && (
                                <Alert variant="danger">{errors.email.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="3">Create Password</Form.Label>
                        <Col sm='9'>
                            <Form.Control name="password" type='password' placeholder="Create Password"
                                ref={register({ 
                                    required:{value:true, message:'Please Enter The password'},
                                    minLength:{value:8, message:'Password cannot be less then eight characters!'} 
                                    })} />
                            {errors.password && (
                                <Alert variant="danger">{errors.password.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button type="submit" variant="outline-primary">Sign Up</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        todoArray: state.todoArray,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        authSuccess: (val) => { dispatch({ type: 'AUTH_SUCCESS', payload: val }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)