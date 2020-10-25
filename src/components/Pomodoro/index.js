import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/actionTypes";

// TODO:
// Rewrite this component
function Pomodoro() {
  const audio = useRef();
  const { pomoMinute, pomoSecond, pomoStart } = useSelector(
    (state) => state.pomodoro
  );
  const dispatch = useDispatch();
  const [pause, setPause] = useState(false);
  const [pomoValue, setPomoValue] = useState({
    pomoM: +pomoMinute * 60,
    pomoS: +pomoSecond,
  });
  let { pomoM, pomoS } = pomoValue;
  // console.log(pomoValue);

  let [intervalId, setIntervalId] = useState("");

  const startPomodoro = () => {
    let firstInterval = setInterval(() => {
      --pomoM;
      setPomoValue({
        pomoM: pomoM,
        pomoS: pomoM % 60,
      });
    }, 1000);
    setIntervalId(firstInterval);
  };

  const handleStart = () => {
    dispatch(actions.startPomodoro(true));
    startPomodoro();
  };

  const handleStop = () => {
    clearInterval(intervalId);
    dispatch(actions.startPomodoro(false));
    setPomoValue({ pomoM: +pomoMinute * 60, pomoS: +pomoSecond });
    setPause(false);
  };

  const popMessage = () => {
    const title = "Pomodoro";
    const option = {
      body: "Pomodoro is finished.",
    };
    let message = new Notification(title, option);
    audio.current.play();
  };

  if (+pomoM === 0 && pomoS === 0 && pomoStart) {
    console.log("clear interval working");
    handleStop();
    popMessage();
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    setPomoValue({ pomoM: +pomoMinute * 60, pomoS: +pomoSecond });
  }, [pomoMinute]);
  // console.log({ pomoM: Math.floor(pomoM / 60) });

  return (
    <div className="pomodoro">
      <audio
        ref={audio}
        src={require("./../../media/intuition-561.mp3")}
        type={"audio/mpeg"}
      />
      <section id="timer">
        <span className="pomo-minute">
          {(Math.floor(pomoM / 60) + "").length < 2
            ? "0" + Math.floor(pomoM / 60)
            : Math.floor(pomoM / 60)}
        </span>
        :
        <span className="pomo-seconds">
          {(pomoS + "").length < 2 ? "0" + pomoS : pomoS}
        </span>
      </section>
      <section id="functions">
        {!pomoStart && (
          <button className="start" onClick={handleStart}>
            {!pause ? "Start" : "Resume"}
          </button>
        )}
        {pomoStart && (
          <button
            className="pause"
            onClick={() => {
              dispatch(actions.startPomodoro(false));
              setPause(true);
              clearInterval(intervalId);
            }}
          >
            Pause
          </button>
        )}
        <button className="stop" onClick={handleStop}>
          Stop
        </button>
      </section>
    </div>
  );
}

export default Pomodoro;
