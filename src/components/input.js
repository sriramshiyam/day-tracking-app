import React, { useEffect, useRef, useState } from "react";
import "./input.css";

function Input({ question, string, s }) {
  const [style, setStyle] = useState("input");
  const inp = useRef();

  useEffect(() => {
    if (!localStorage.getItem("tracks")) {
      let r = {};
      r[`${Date().substring(4, 15)}`] = "white";
      localStorage.setItem("tracks", JSON.stringify({ ...r }));
    }

    setStyle((prev) => prev + " inputfadein");
    setTimeout(() => inp.current.focus(), 700);
  }, []);

  function setitem(n) {
    localStorage.setItem(string, n);
    setStyle((prev) => prev.split(" ")[0]);
    setTimeout(() => {
      s();
      inp.current.value = "";
      setStyle((prev) => prev + " inputfadein");
      setTimeout(() => (inp.current ? inp.current.focus() : ""), 500);
    }, 700);
  }

  return (
    <div className={style}>
      <h1>{question}</h1>
      <input ref={inp} type="text" />
      <button onClick={() => setitem(inp.current.value)}>Submit</button>
    </div>
  );
}

export default Input;
