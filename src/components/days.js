import React, { useEffect, useState } from "react";
import Day from "./day";
import "./days.css";
import Settings from "./settings";

function Days({ s }) {
  const [style, setStyle] = useState("days");
  const [tracks, setTracks] = useState([]);
  const [setdis, setSetdis] = useState(false);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  function dis() {
    setSetdis((prev) => !prev);
  }

  function changecolor(date, color) {
    let trac = JSON.parse(localStorage.getItem("tracks"));
    trac[date] = color;
    localStorage.setItem("tracks", JSON.stringify(trac));
  }

  useEffect(() => {
    if (
      !(
        Object.keys(JSON.parse(localStorage.getItem("tracks")))[
          Object.keys(JSON.parse(localStorage.getItem("tracks"))).length - 1
        ] === Date().substring(4, 15)
      )
    ) {
      let r = JSON.parse(localStorage.getItem("tracks"));
      r[`${Date().substring(4, 15)}`] = "white";
      localStorage.setItem("tracks", JSON.stringify(r));
    }

    let t = [];

    for (
      let track = 0;
      track < Object.keys(JSON.parse(localStorage.getItem("tracks"))).length;
      track++
    ) {
      if (
        Object.keys(JSON.parse(localStorage.getItem("tracks")))
          [track].split(" ")
          .slice(0, 2)
          .join(" ") === "Jan 01"
      ) {
        t = t.concat(
          <Day
            canchange={false}
            key={new Date().getFullYear()}
            date={`0 ${new Date().getFullYear()}`}
            color={"white"}
            changecolor={changecolor}
          />
        );
      }

      t = t.concat(
        <Day
          canchange={
            track + 1 ===
            Object.keys(JSON.parse(localStorage.getItem("tracks"))).length
          }
          key={Object.keys(JSON.parse(localStorage.getItem("tracks")))[track]}
          date={Object.keys(JSON.parse(localStorage.getItem("tracks")))[track]}
          color={
            Object.values(JSON.parse(localStorage.getItem("tracks")))[track]
          }
          changecolor={changecolor}
        />
      );
    }

    setTracks(t);
    setStyle((prev) => prev + " daysfadein");

    quote();
  }, []);

  function quote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((json) => {
        setQ(json.content);
        setA(json.author);
      });
  }

  return (
    <div className={style}>
      <div>
        <span
          style={{
            wordBreak: "break-word",
            width: "60%",
            fontStyle: "italic",
            display: "inline-block",
            lineHeight: 1.5,
          }}
        >
          " {q} "
        </span>
        <br />
        <br />
        <span>- {a}</span>
      </div>
      <h1>{localStorage.getItem("title")}</h1>
      <div className="d">{tracks}</div>
      <span onClick={dis} id="settings">
        &#9881; {localStorage.getItem("name")}
      </span>
      <Settings dis={dis} setdis={setdis} s={s} />
    </div>
  );
}

export default Days;
