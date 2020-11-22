import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.setnavItem("login");
    this.props.logout();
  }

  render() {
    console.log(this.props.authDetails, "UserDetails");
    return <Redirect to="/login" />;
  }
}

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

export default connect(null, mapDispatchToProps)(Logout);
