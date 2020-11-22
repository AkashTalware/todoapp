import React, { Component } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  NavItem
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CgLogOff } from "react-icons/cg";
import { FcTodoList } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

class Header extends Component {
  logout = () => {
    this.props.logout();
  };

  handlenav = (nav) => {
    console.log("Navbar Clicked");
    this.props.setnavItem(nav);
  };

  styleTab = {
    backgroundColor: "white",
    padding: "5px",
    borderRadius: "3px"
  };

  render() {
    console.log(this.props.authDetails, this.props, "UserDetails");

    return (
      <>
        <Container sm={3}>
          <Navbar bg="dark" variant="dark" sticky="top">
            <NavbarBrand>
              {" "}
              <FcTodoList className="mx-2" />
              To Do List
            </NavbarBrand>
            <Nav className="ml-5 mr-auto">
              <NavItem
                className="mx-2 my-auto"
                style={this.props.navItem === "home" ? this.styleTab : {}}
              >
                <Link
                  to="/"
                  onClick={() => {
                    this.handlenav("home");
                  }}
                >
                  Home
                </Link>
              </NavItem>
              {this.props.authDetails.name == null ? (
                <NavItem
                  bg="light"
                  className="mx-2 my-auto"
                  style={this.props.navItem === "login" ? this.styleTab : {}}
                >
                  <Link
                    to="/login"
                    onClick={() => {
                      this.handlenav("login");
                    }}
                  >
                    Login
                  </Link>
                </NavItem>
              ) : (
                <>
                  <NavItem
                    className="mx-2 my-auto"
                    style={this.props.navItem === "tasks" ? this.styleTab : {}}
                    href="/tasks"
                  >
                    <Link
                      to="/tasks"
                      onClick={() => {
                        this.handlenav("tasks");
                      }}
                    >
                      Tasks
                    </Link>
                  </NavItem>
                  <NavItem
                    className="mx-2 my-auto"
                    style={
                      this.props.navItem === "addtask" ? this.styleTab : {}
                    }
                    onClick={() => {
                      this.handlenav("addtask");
                    }}
                  >
                    <Link to="/addtask">Add Task</Link>
                  </NavItem>
                  <NavItem
                    className="mx-2 my-auto"
                    style={this.props.navItem === "view" ? this.styleTab : {}}
                    onClick={() => {
                      this.handlenav("view");
                    }}
                  >
                    <Link to="/view">View</Link>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="mr-4">
              {this.props.authDetails.name == null ? (
                <></>
              ) : (
                <>
                  <FaUserAlt className="ml-2 my-auto" color="white" />
                  <NavDropdown
                    className="mx-2 my-auto"
                    title={this.props.authDetails.name}
                  >
                    <NavDropdown.Item> UserName</NavDropdown.Item>
                    <NavDropdown.Item>
                      <CgProfile /> Profile
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavItem className="mx-2 my-auto">
                    <Link to="/logout">
                      {" "}
                      <CgLogOff className="ml-2 my-auto" color="white" /> Logout
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Navbar>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authDetails: state.authDetails.name != null ? state.authDetails : false,
    navItem: state.navItem
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: (val) => {
      dispatch({ type: "LOGOUT", payload: val });
    },
    setnavItem: (val) => {
      dispatch({ type: "ACTIVE_NAV", payload: val });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
