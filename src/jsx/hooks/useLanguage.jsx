import { useState } from "react";

import {
  LOCAL_STORAGE_APP_SIGNATURE,
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../../js/constants";

const LOCAL_STORAGE_LANGUAGE_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("language");

const validLanguages = [ENGLISH_LANGUAGE, RUSSIAN_LANGUAGE];

function isLanguageCorrect(lang) {
  return validLanguages.indexOf(lang) !== -1;
}

function loadInitState() {
  const localLanguage = window.localStorage.getItem(LOCAL_STORAGE_LANGUAGE_NAME);
  return (isLanguageCorrect(localLanguage) && localLanguage) || DEFAULT_LANGUAGE;
}

function storeLanguageInLocalStorage(language) {
  window.localStorage.setItem(LOCAL_STORAGE_LANGUAGE_NAME, language);
}

function useLanguage() {
  const [curLang, setLang] = useState(loadInitState());

  function updateLanguage(newLang) {
    storeLanguageInLocalStorage(newLang);
    setLang(newLang);
  }

  return {
    curLang,
    updateLanguage,
  };
}

export default useLanguage;
