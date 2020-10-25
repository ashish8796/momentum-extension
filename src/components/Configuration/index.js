/* eslint-disable no-undef */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Shortcuts from "../Shortcuts";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./../../store/actionTypes";

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
  } = useSelector(({ quoteState, settings, pomodoro, weatherState }) => ({
    quoteState,
    settings,
    weatherState,
    pomodoro,
  }));

  const len = Object.keys(settings.linkObj).length;

  const [linkFacebook, setLinkFacebook] = useState({
    userName: len > 0 ? settings.linkObj["facebook"].userName : "",
    iconName: "",
    siteName: "",
  });
  const [linkGithub, setLinkGithub] = useState({
    userName: len > 0 ? settings.linkObj["github"].userName : "",
    iconName: "",
    siteName: "",
  });
  const [linkLinkedin, setLinkLinkedin] = useState({
    userName: len > 0 ? settings.linkObj["linkedIn"].userName : "",
    iconName: "",
    siteName: "",
  });
  const [linkTwitter, setLinkTwiter] = useState({
    userName: len > 0 ? settings.linkObj["twitter"].userName : "",
    iconName: "",
    siteName: "",
  });

  const [cityName, setCityName] = useState(weatherState.cityName);

  const dispatch = useDispatch();

  const [pomoM, setPomoM] = useState(pomoMinute);

  const handleOnSubmit = (event) => {
    linkTwitter.userName && dispatch(actions.addLinkToFooter(linkTwitter));
    linkFacebook.userName && dispatch(actions.addLinkToFooter(linkFacebook));
    linkGithub.userName && dispatch(actions.addLinkToFooter(linkGithub));
    linkLinkedin.userName && dispatch(actions.addLinkToFooter(linkLinkedin));
  };

  let faTwitter = "faTwitter",
    faFacebook = "faFacebook",
    faGithub = "faGithub",
    faLinkedin = "faLinkedin";

  const handleOnChange = (event) => {
    const userName = event.target.value;
    if (event.target.id === "twitter") {
      setLinkTwiter({ userName, iconName: faTwitter, siteName: "twitter" });
    }
    if (event.target.id === "facebook") {
      setLinkFacebook({ userName, iconName: faFacebook, siteName: "facebook" });
    }
    if (event.target.id === "linkedIn") {
      setLinkLinkedin({ userName, iconName: faLinkedin, siteName: "linkedIn" });
    }
    if (event.target.id === "github") {
      setLinkGithub({ userName, iconName: faGithub, siteName: "github" });
    }
  };

  const handleCityChange = (event) => {
    cityName && dispatch(actions.changeCity(cityName));
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();
    pomoM &&
      dispatch(
        actions.changePomodoroTime({
          pomoMinute: pomoM,
          pomoSecond: 0,
        })
      );
    handleCityChange(event);
    handleOnSubmit(event);
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
                      dispatch(actions.timeFormat(false));
                    }}
                  >
                    <p id="p-off">OFF</p>
                  </div>
                  <div
                    className="on"
                    onClick={() => {
                      dispatch(actions.timeFormat(true));
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
              <div className="shortcut-links">
                <input
                  type="text"
                  placeholder="Twitter Username"
                  onChange={handleOnChange}
                  value={linkTwitter.userName}
                  id="twitter"
                />
                <input
                  type="text"
                  placeholder="Linkedin Username"
                  onChange={handleOnChange}
                  value={linkLinkedin.userName}
                  id="linkedIn"
                />
                <input
                  type="text"
                  placeholder="Facebook Username"
                  onChange={handleOnChange}
                  value={linkFacebook.userName}
                  id="facebook"
                />
                <input
                  type="text"
                  placeholder="Github Username"
                  onChange={handleOnChange}
                  value={linkGithub.userName}
                  id="github"
                />
              </div>

              {/* <!-- On-Off div for the quotes --> */}
              <div className="on-off-quotes">
                <div className="show-quotes-btn">
                  <div
                    className={`off `}
                    onClick={() => {
                      dispatch(actions.toggleQuote(false));
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
                      dispatch(actions.toggleQuote(true));
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
                  min={0}
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
