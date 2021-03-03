import React from "react";
import PropTypes from "prop-types";

import { DEFAULT_LANGUAGE, ENGLISH_LANGUAGE, RUSSIAN_LANGUAGE } from "../../js/constants";

function LanguageSettings(props) {
  function printLanguageText() {
    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return "Choose language";
      }
      case RUSSIAN_LANGUAGE: {
        return "Выберите язык";
      }
      default: {
        return "";
      }
    }
  }

  return (
    <div>
      {printLanguageText()}
      <select name="language" id="language" value={props.curLang} onChange={(event) => {
        props.updateLanguage(event.target.value);
      }}>
        <option value={ENGLISH_LANGUAGE}>{ENGLISH_LANGUAGE}</option>
        <option value={RUSSIAN_LANGUAGE}>{RUSSIAN_LANGUAGE}</option>
      </select>
    </div>
  );
}

LanguageSettings.propTypes = {
  curLang: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,

};

LanguageSettings.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default LanguageSettings;
