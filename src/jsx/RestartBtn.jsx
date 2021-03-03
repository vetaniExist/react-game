import React from "react";
import PropTypes from "prop-types";

import {
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../js/constants";

function printRestart(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      return "Restart";
    }
    case RUSSIAN_LANGUAGE: {
      return "Новая игра";
    }
    default: {
      return "";
    }
  }
}

function RestartBtn(props) {
  return (
    <button onClick={() => props.clickHandler()}>
      {printRestart(props.curLang)}
    </button>);
}

RestartBtn.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  curLang: PropTypes.string,
};

RestartBtn.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default RestartBtn;
