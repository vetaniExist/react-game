import React from "react";
import PropTypes from "prop-types";

import {
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../js/constants";

function Record(props) {
  function getResultOfGame() {
    if (props.value === "") {
      switch (props.curLang) {
        case ENGLISH_LANGUAGE: {
          return "Stalemate";
        }
        case RUSSIAN_LANGUAGE: {
          return "Ничья";
        }
        default: {
          return "";
        }
      }
    }

    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return `"${props.value}" win`;
      }
      case RUSSIAN_LANGUAGE: {
        return `"Победа ${props.value}"`;
      }
      default: {
        return "";
      }
    }
  }

  return (
    <p>{props.index}: {getResultOfGame()}</p>
  );
}

Record.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  curLang: PropTypes.string,
};

Record.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default Record;
