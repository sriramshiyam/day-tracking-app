import { useState } from "react";
import "./App.css";
import Days from "./components/days";
import Input from "./components/input";

function App() {
  
  const [page, setPage] = useState(
    !localStorage.getItem("name") ? 0 : !localStorage.getItem("title") ? 1 : 2
  );

  function s(st) {
    setPage(st);
  }
  return (
    <div className="App">
      {page == 0 ? (
        <Input question={"What is your name ?"} s={() => s(1)} string="name" />
      ) : page == 1 ? (
        <Input
          question={"Enter a title for your tracking ?"}
          s={() => s(2)}
          string="title"
        />
      ) : (
        <Days s={() => s(0)} />
      )}
    </div>
  );
}

export default App;
