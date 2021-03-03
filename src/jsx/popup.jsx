import React from "react";
import PropTypes from "prop-types";

import {
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../js/constants";

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

  function configurateWinMessage() {
    if (props.gameWinner) {
      switch (props.curLang) {
        case ENGLISH_LANGUAGE: {
          return `Game winner is ${props.gameWinner}.`;
        }
        case RUSSIAN_LANGUAGE: {
          return `Победитель: ${props.gameWinner}`;
        }
        default: {
          break;
        }
      }
    }
    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return "Stalemate";
      }
      case RUSSIAN_LANGUAGE: {
        return "Ничья";
      }
      default: {
        break;
      }
    }
    return "";
  }

  return (
    <div className="popup" style={configurateStyle()}>
      {configurateWinMessage()}
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
  curLang: PropTypes.string,
};

Popup.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default Popup;
