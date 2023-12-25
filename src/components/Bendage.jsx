import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Bendage extends Component {
  static defaultProps = {
    notification: 0,
  };
  static propTypes = {
    notification:PropTypes.number,
  };
  render() {
    return (
      <button type="button" className="btn btn-primary position-relative">
        Inbox
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {this.props.notification}
          <span className="visually-hidden">unread messages</span>
        </span>
      </button>
    );
  }
}
