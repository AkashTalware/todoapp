import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function HomePage(props) {
  useEffect(() => {
    props.setnavItem("home");
  }, []);

  return (
    <>
      <Container>
        <Jumbotron
          fluid
          bg="dark"
          style={{
            backgroundColor: "#0d1210",
            textAlign: "center",
            width: "70%"
          }}
          className="mt-4 mx-auto"
        >
          <h1>Hello user!!</h1>
          <p>Welocome to Your To-Do List</p>
          <p>To get started You have to login first.</p>
          <p>
            {" "}
            <Link to="/login">Click here</Link> to go to the login page
          </p>
          <br />
          <p>
            Don't have an account? <Link to="/signup">Click here</Link> to
            create Your account
          </p>
        </Jumbotron>
      </Container>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setnavItem: (val) => {
      dispatch({ type: "ACTIVE_NAV", payload: val });
    }
  };
};
export default connect(null, mapDispatchToProps)(HomePage);
