import "./homePage.css";
import troll from "../../images/troll.svg";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { getMemeThunk } from "../../features/memeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hookType";

const HomePage = () => {
  return (
    <>
      <div className="homePage">
        <h1 className="homePage__bgText">You've been trolled</h1>
        <h1 className="homePage__header">Welcome to meme creator</h1>
        <Link to="memes" className="link">
          <button className="homePage__button">
            <span className="button__span">START</span>
            <img className="button__img" src={troll} alt="" />
          </button>
        </Link>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default HomePage;
