const newDate = () => {
  const dateStr = new Date();
  const hour = String(dateStr).slice(16, 18);
  const minute = String(dateStr).slice(19, 21);
  const second = String(dateStr).slice(22, 24);
  const dateNum = String(dateStr).slice(8, 10);
  const year = String(dateStr).slice(11, 15);
  const month = String(dateStr).slice(4, 7);
  const day = String(dateStr).slice(0, 3);

  return { date: { dateNum, day, month, year, }, time: { hour, minute, second } }
}

export default newDate;