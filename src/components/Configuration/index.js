/* eslint-disable no-undef */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Shortcuts from "../Shortcuts";
import { useDispatch, useSelector } from "react-redux";
import {
  addLinkToFooter,
  changeCity,
  changePomodoroTime,
  timeFormat,
  toggleQuote,
} from "../../store/actions";

// TODO:
// 1 - Use Object for short url state
// 2 - Create getSiteLink function for getting a site link -> getSiteLink(site) => siteLink
// 3 - Create array for fields and map them to create jsx
function Configuration() {
  const [isCogOptionVisible, setIsConOptionVisible] = useState(false);
  const {
    showQuote,
    weatherState,
    settings,
    pomodoro: { pomoMinute = 5 },
  } = useSelector(({ quoteState, settings, weatherState, pomodoro }) => ({
    quoteState,
    settings,
    weatherState,
    pomodoro,
  }));
  const [links, setLinks] = useState({ ...settings.links });
  const [cityName, setCityName] = useState(weatherState.cityName);
  const dispatch = useDispatch();
  const [pomoM, setPomoM] = useState(pomoMinute);

  const handleOnChange = (event) => {
    setLinks({
      ...links,
      [event.target.name]: event.target.value,
    });
  };
  const siteArr = ["twitter", "facebook", "linkedin", "github"];

  const getSiteLink = () => {
    return siteArr.map((link, i) => (
      <input
        type="text"
        placeholder={`${link[0].toUpperCase() + link.slice(1)} Username`}
        onChange={handleOnChange}
        value={links[link]}
        name={link}
        key={i}
      />
    ));
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();
    pomoM && dispatch(changePomodoroTime({ pomoMinute: pomoM }));
    cityName && dispatch(changeCity(cityName));
    dispatch(addLinkToFooter(links));
    setIsConOptionVisible(false);
  };

  return (
    <>
      <Shortcuts />
      {isCogOptionVisible && (
        <div
          className="setting-layout"
          onClick={() => {
            setIsConOptionVisible(false);
          }}
        ></div>
      )}
      {isCogOptionVisible && (
        <div className="cog-option">
          {/* Left-side section*/}

          <section className="setting-opt">
            <h1>12 Hour Format</h1>
            <h1>Add Links</h1>
            <h1>Quotes</h1>
            <h1>Change City</h1>
            <h1>Set Pomodoro</h1>
          </section>

          {/* <!-- Right-side section --> */}
          <section className="change-setting">
            {/* <!-- Div for changing the time formate form 24Hr to 12Hr or vice-versa  --> */}
            <form onSubmit={handleSaveSettings} className="settings-form">
              <div className="change-hour-format">
                <div className="on-off-btn">
                  <div
                    className="off"
                    onClick={() => {
                      dispatch(timeFormat(false));
                    }}
                  >
                    <p id="p-off">OFF</p>
                  </div>
                  <div
                    className="on"
                    onClick={() => {
                      dispatch(timeFormat(true));
                    }}
                    style={{
                      backgroundColor: settings.format ? "#05dfd7" : "#30475e",
                    }}
                  >
                    <p id="p-on">ON</p>
                  </div>
                </div>
              </div>

              {/* <!-- Div for entering shortcut links --> */}
              <div className="shortcut-links">{getSiteLink()}</div>

              {/* <!-- On-Off div for the quotes --> */}
              <div className="on-off-quotes">
                <div className="show-quotes-btn">
                  <div
                    className={`off `}
                    onClick={() => {
                      dispatch(toggleQuote(false));
                    }}
                  >
                    <p id="p-hide-q">OFF</p>
                  </div>
                  <div
                    className={`on `}
                    style={{
                      backgroundColor: showQuote ? "#05dfd7" : "#30475e",
                    }}
                    onClick={() => {
                      dispatch(toggleQuote(true));
                    }}
                  >
                    <p id="p-show-q">ON</p>
                  </div>
                </div>
              </div>

              {/* <!-- Form for changing the city --> */}
              <div className="change-city">
                <input
                  type="text"
                  className="city-input"
                  placeholder="Enter City Name"
                  onChange={(event) => {
                    setCityName(event.target.value);
                  }}
                  value={cityName}
                />
              </div>

              <div className="pomodoro-cog">
                <input
                  type="number"
                  id="pomoM"
                  placeholder="Minute"
                  min={1}
                  max={60}
                  value={pomoM}
                  onChange={(event) => {
                    setPomoM(event.target.value);
                  }}
                />
              </div>
              <button
                className="save"
                type="submit"
                onSubmit={handleSaveSettings}
              >
                Save
              </button>
            </form>
          </section>
        </div>
      )}
      <div className="setting-container">
        <div
          className="cog-btn"
          onClick={() => {
            setIsConOptionVisible(!isCogOptionVisible);
          }}
          title="Settings"
        >
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>
    </>
  );
}

export default Configuration;
