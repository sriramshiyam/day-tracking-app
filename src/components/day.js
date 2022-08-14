import React, { useState } from "react";
import "./day.css";

function Day({ date, color, changecolor, canchange }) {
  const [style, setStyle] = useState("colorpicker");
  const [cursor, setCursor] = useState("");
  const [boxColor, setBoxColor] = useState(color);

  function colorstyle() {
    if (canchange) {
      setStyle((prev) => prev + " colorpickerfadein");
      setBoxColor(color);
      setTimeout(() => setCursor("cursor"), 500);
    }
  }

  function removecolorpickerstyle(color) {
    if (canchange) {
      setStyle((prev) => prev.split(" ")[0]);
      setBoxColor(color);
      changecolor(date, color);
      setTimeout(() => setCursor(""), 500);
    }
  }

  return (
    <div
      style={{ background: boxColor }}
      className={`day ${cursor}`}
      onClick={cursor == "" ? colorstyle : () => 0}
    >
      <span style={{ color: "black" }}>
        {date.split(" ")[1] == "01"
          ? date.split(" ")[0] + " " + date.split(" ")[1]
          : date.split(" ")[1]}
      </span>
      <div className={style}>
        <div
          className="red"
          onClick={() => removecolorpickerstyle("hsl(348, 100%, 68%)")}
        ></div>
        <div
          className="yellow"
          onClick={() => removecolorpickerstyle("hsl(43, 84%, 65%)")}
        ></div>
        <div
          className="green"
          onClick={() => removecolorpickerstyle("hsl(145, 58%, 55%)")}
        ></div>
      </div>
    </div>
  );
}

export default Day;
