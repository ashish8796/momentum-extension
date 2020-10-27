import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDateAndTime } from "../../store/actions";
import newDate, { changeFormat } from "./../../utils/clock";

function Clock() {
  const { clock, settings } = useSelector((state) => state);

  const { date, time } = clock;
  // console.log({ time, 1: 1 });
  const { format } = settings;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeDateAndTime(newDate()));
    // TODO:
    // Clear this interval
    const interval = setInterval(() => {
      dispatch(changeDateAndTime(newDate()));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="timer">
      <div className="time">
        <div>
          <span className="hour">
            {format ? changeFormat(time.hour) : time.hour}
          </span>
          :<span className="minute">{time.minute}</span>:
          <span className="second">{time.second}</span>
        </div>
        {format && (
          <div>
            <span className="am-pm">{time.hour > 11 ? "PM" : "AM"}</span>
          </div>
        )}
      </div>
      <div className="current-date">
        <p>
          <span className="day">{date.day}</span>,
          <span className="date"> {date.dateNum}</span>
          <span className="month"> {date.month}</span>
          <span className="year"> {date.year}</span>
        </p>
      </div>
    </div>
  );
}

export default Clock;
