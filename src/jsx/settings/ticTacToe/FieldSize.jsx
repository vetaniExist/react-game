import React from "react";

export default function FieldSize(props) {

  return (
    <label>
      Field Size {props.fieldSizeValue}
      <input type="range"
        onChange={event => {
          props.fieldSizeHandler(event.target.value)
        }}
        min={3}
        max={10}
        step={1}
        defaultValue={3}
      />
    </label>
  );
}
