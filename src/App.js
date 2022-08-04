import Game from "./components/Game.js";
import HighScores from "./components/HighScores.js";
import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
      </Routes>
    </BrowserRouter>
  );
}
