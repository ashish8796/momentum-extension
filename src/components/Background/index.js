import React, { useEffect, useState } from "react";
import Clock from "./../Clock";
import Weather from "./../Weather";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./../../store/actionTypes";
import Quotes from "../Quotes";
import Todos from "../Todos";
import Configuration from "../Configuration";
import Pomodoro from "../Pomodoro";

function Background() {
  const dispatch = useDispatch();
  const wallpaperUrl = useSelector((state) => state.background.url);
  const uri = "https://source.unsplash.com/1600x900/?nature";

  const fetchBackground = (uri) => {
    fetch(uri)
      .then((response) => {
        dispatch(actions.getWallpaper(response.url));
      })
      .catch((error) => {
        window.location.reload();
      });
  };
  useEffect(() => {
    fetchBackground(uri);
    setInterval(() => {
      fetchBackground(uri);
    }, 60000);
  }, []);

  return (
    <>
      <div
        className="wrapper"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      >
        <div className="overlay"></div>
        <Weather />
        <div className="overlay1"></div>
        <Clock />
        <Quotes />
        <Todos />
        <Configuration />
        <Pomodoro />
      </div>
    </>
  );
}

export default Background;
