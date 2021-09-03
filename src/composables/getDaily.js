const getDaily = () => {
  const date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;

  const daily = `${y}-${m}-${d}`;

  return {
    daily,
  };
};

export default getDaily;
