import React from "react";
import PropTypes from "prop-types";

import Record from "./Record.jsx";

function RecordsTable(props) {
  function configurateStyle() {
    if (props.isShow) {
      return {};
    }
    return {
      display: "none",
    };
  }
  return (
    <div className="records-div" style={configurateStyle()}>
      {
        props.records.map((el, index) => <Record key={index}
          index={props.records.length - index}
          value={el}
          curLang={props.curLang} />)
      }
      <button onClick={() => props.hide()}>
        &#10005;
      </button>
    </div>
  );
}

RecordsTable.propTypes = {
  isShow: PropTypes.bool.isRequired,
  records: PropTypes.array.isRequired,
  curLang: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};

export default RecordsTable;
