import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./pages/MainPage/MainPage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;