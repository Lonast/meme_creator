import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import user from "../../images/user.svg";
import { Link, Outlet } from "react-router-dom";
import pikachu from "../../images/pikachu.png";

const Header = () => {
  const [profile, setProfile] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const body = document.querySelector("body");
    const closeDropDown: (e: MouseEvent | TouchEvent) => void = (e) => {
      if (e.target !== ref.current) {
        setProfile(false);
      }
    };
    body?.addEventListener("click", closeDropDown);
    return () => {
      body?.removeEventListener("click", closeDropDown);
    };
  }, []);
  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={pikachu} alt="" />
        </Link>
        <div className="header__container">
          <Link to="/" className="header__container-text">
            Home
          </Link>
          <Link to="/yourMeme" className="header__container-text">
            Create
          </Link>
          <Link to="/info" className="header__container-text">
            Info
          </Link>
        </div>
        <div className="hader__user">
          <img
            onClick={() => setProfile((prev) => !prev)}
            className="hader__user-img"
            src={user}
            alt=""
            ref={ref}
          />
          {profile && (
            <div className="header__user-menu">
              You've been trolled again 😃 There's no profile here
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
