import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startPomodoro } from "../../store/actions";

// TODO:
// Rewrite this component
function Pomodoro() {
  const audio = useRef();
  const { pomoMinute, pomoStart } = useSelector((state) => state.pomodoro);
  const dispatch = useDispatch();
  const [pause, setPause] = useState(false);
  const [totalTime, setTotalTime] = useState(+pomoMinute * 60);

  let [intervalId, setIntervalId] = useState("");

  const handleStart = () => {
    dispatch(startPomodoro(true));
    let firstInterval = setInterval(() => {
      setTotalTime((n) => n - 1);
    }, 1000);
    setIntervalId(firstInterval);
  };

  const handleStop = () => {
    clearInterval(intervalId);
    dispatch(startPomodoro(false));
    setTotalTime(pomoMinute * 60);
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

  if (totalTime === 0) {
    handleStop();
    popMessage();
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    setTotalTime(+pomoMinute * 60);
  }, [pomoMinute]);

  return (
    <div className="pomodoro">
      <audio
        ref={audio}
        src={require("./../../media/intuition-561.mp3")}
        type={"audio/mpeg"}
      />
      <section id="timer">
        <span className="pomo-minute">
          {(Math.floor(totalTime / 60) + "").length < 2
            ? "0" + Math.floor(totalTime / 60)
            : Math.floor(totalTime / 60)}
        </span>
        :
        <span className="pomo-seconds">
          {((totalTime % 60) + "").length < 2
            ? "0" + (totalTime % 60)
            : totalTime % 60}
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
              dispatch(startPomodoro(false));
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
