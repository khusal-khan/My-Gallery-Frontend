import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Tooltips extends Component {
  static defaultProps = {
    tooltipMsg: "",
  };
  static propTypes = {
    tooltipMsg: PropTypes.string,
  };
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-custom-className="custom-tooltip"
          data-bs-title={this.props.tooltipMsg}
        >
          Custom tooltip
        </button>
      </>
    );
  }
}
