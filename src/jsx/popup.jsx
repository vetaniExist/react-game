import React from "react";
import PropTypes from "prop-types";

const overlay = document.getElementById("overlay");

function Popup(props) {
  function configurateStyle() {
    if (props.isShow) {
      overlay.style.opacity = 0.6;
      overlay.style.display = "inherit";
      return {};
    }
    overlay.style.opacity = 0;
    overlay.style.display = "none";
    return {
      display: "none",
    };
  }

  function restart() {
    props.restart();
    props.hide();
  }

  return (
    <div className="popup" style={configurateStyle()}>
      Game winner is { props.gameWinner}.
      <div>
        <button onClick={() => props.hide()}>Close</button>
        <button onClick={() => restart()}>Restart</button>
      </div>

    </div>
  );
}

Popup.propTypes = {
  gameWinner: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
};

export default Popup;
