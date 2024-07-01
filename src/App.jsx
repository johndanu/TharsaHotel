import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Booking from "./page/booking";
import Header from "./components/header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header pages={["Home"]} />
      <Booking />
    </>
  );
}

export default App;
