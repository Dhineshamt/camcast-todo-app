const getDateAndTime = () => {
  let date = new Date();
  return (
    date.toISOString() + "+" + date.getUTCHours() + ":" + date.getUTCMinutes()
  );
};

export default getDateAndTime;
