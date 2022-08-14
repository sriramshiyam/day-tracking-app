import React, { useEffect, useRef } from "react";
import "./settings.css";

function Settings({ dis, setdis, s }) {
  const titleinp = useRef();
  useEffect(() => {
    if (titleinp.current) {
      titleinp.current.focus();
    }
  }, []);

  function settitle(str) {
    titleinp.current.value = "";
    localStorage.setItem("title", str);
    dis();
  }

  function clear() {
    s();
    localStorage.clear();
    dis();
  }

  function close() {
    dis();
  }

  return (
    <div className="settings" style={{ display: setdis ? "flex" : "none" }}>
      <h2>enter a new title</h2>
      <input ref={titleinp} type="text" />
      <button onClick={() => settitle(titleinp.current.value)}>Submit</button>
      <br />
      <button className="clear" onClick={() => clear()}>
        Clear data
      </button>
      <button className="clear" onClick={() => close()}>
        Close
      </button>
    </div>
  );
}

export default Settings;
