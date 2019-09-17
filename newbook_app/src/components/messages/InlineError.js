import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
  <p className = "error" style={{ color: "#ae5856" }}>{text}</p>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
