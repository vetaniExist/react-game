// https://upmostly.com/tutorials/modal-components-react-custom-hooks
import { useState } from "react";

function usePopup(initialState) {
  const [isShow, setIsShow] = useState(initialState);

  function togglePopup() {
    setIsShow(!isShow);
  }

  return {
    isShow,
    togglePopup,
  };
}

export default usePopup;
