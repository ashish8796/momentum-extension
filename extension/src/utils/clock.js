const newDate = () => {
  const dateStr = new Date();
  const hour = String(dateStr).slice(16, 18);
  const minute = String(dateStr).slice(19, 21);
  const second = String(dateStr).slice(22, 24);
  const dateNum = String(dateStr).slice(8, 10);
  const year = String(dateStr).slice(11, 15);
  const month = String(dateStr).slice(4, 7);
  const day = String(dateStr).slice(0, 3);

  // console.log(typeof hour);

  return {
    date: { dateNum, day, month, year },
    time: { hour, minute, second },
  };
};

export const changeFormat = (hour) => {
  hour =
    hour >= 13
      ? hour - 12 < 10
        ? "0" + (hour - 12)
        : hour - 12
      : hour < 10 && hour.length < 2
      ? "0" + hour
      : hour;
  return hour;
};

export default newDate;
