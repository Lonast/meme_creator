import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./components/homePage/HomePage";
import Info from "./components/info/Info";
import Meme from "./components/meme/Meme";
import MemesPage from "./components/memesPage/MemesPage";
import YourMeme from "./components/yourMeme/YourMeme";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="memes" element={<MemesPage />} />
        <Route path="memes/:id" element={<Meme />} />
        <Route path="/info" element={<Info />} />
        <Route path="yourMeme" element={<YourMeme />} />
      </Route>
    </Routes>
  );
}

export default App;
