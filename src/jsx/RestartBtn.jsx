import React from "react";
import PropTypes from "prop-types";

function RestartBtn(props) {
  return (
    <button onClick={() => props.clickHandler()}>
      Restart
    </button>);
}

RestartBtn.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default RestartBtn;
