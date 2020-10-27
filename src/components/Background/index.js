import React, { useEffect } from "react";
import Clock from "./../Clock";
import Weather from "./../Weather";
import { useDispatch, useSelector } from "react-redux";
import { setWallpaper } from "../../store/actions";
import Quotes from "../Quotes";
import Todos from "../Todos";
import Configuration from "../Configuration";
import Pomodoro from "../Pomodoro";
import { unsplashURI } from "../../config";

function Background() {
  const dispatch = useDispatch();
  const wallpaperUrl = useSelector((state) => state.background.url);
  console.log({ wallpaperUrl, 1: 1 });
  // TODO:
  // Move fetchBackground to thunk
  const fetchBackground = (uri) => {
    fetch(uri)
      .then((response) => {
        // console.log(response.url);
        dispatch(setWallpaper(response.url));
      })
      .catch((error) => {
        window.location.reload();
      });
  };
  useEffect(() => {
    fetchBackground(unsplashURI);
    let interval = setInterval(() => {
      fetchBackground(unsplashURI);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="wrapper"
      style={{ backgroundImage: `url(${wallpaperUrl})` }}
    >
      <div className="overlay"></div>
      <Weather />
      <Clock />
      <Quotes />
      <Todos />
      <Configuration />
      <Pomodoro />
    </div>
  );
}

export default Background;
