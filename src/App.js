import { useState } from "react";
import "./styles.css";

export default function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [disabled, setDisbaled] = useState(false);
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  return (
    <div className="App">
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>{" "}
      <input
        type="checkbox"
        id="enable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onClick={(e) => setDisbaled(e.target.checked)}
      ></input>
    </div>
  );
}
