import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Login(props) {
  const { register, errors, handleSubmit } = useForm();

  const handleAuth = (evt) => {
    props.authSuccess({ name: evt.name, password: evt.password });
    props.setnavItem("tasks");
    props.history.push("/tasks");
    console.log(evt);
  };

  return (
    <div>
      <Container className="m-5" style={{ width: "90%" }}>
        <Form onSubmit={handleSubmit(handleAuth)}>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Username or Email ID:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Username or Email ID"
                ref={register({
                  required: { value: true, message: "Username is required" }
                })}
              />
              {errors.name && (
                <Alert variant="danger">{errors.name.message}</Alert>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Password:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter Password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please Enter The password"
                  },
                  minLength: {
                    value: 8,
                    message: "Password cannot be less then eight characters!"
                  }
                })}
              />
              {errors.password && (
                <Alert variant="danger">{errors.password.message}</Alert>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 9, offset: 3 }}>
              <Button type="submit" variant="outline-primary">
                Sign in
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <br />
        <p>
          Don't Have an account?? <Link to="/signup">Cilck Here</Link> to Create
          account
        </p>
      </Container>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    todoArray: state.todoArray,
    navItem: state.navItem
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    authSuccess: (val) => {
      dispatch({ type: "AUTH_SUCCESS", payload: val });
    },
    setnavItem: (val) => {
      dispatch({ type: "ACTIVE_NAV", payload: val });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
