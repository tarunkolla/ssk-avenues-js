const calColor = (avaiable, total) => {
  if (typeof total != 'number' || typeof avaiable != 'number') return 'red';
  if (total < avaiable) return 'red';
  const ratio = avaiable / total;

  if (ratio < 0.25) {
    return 'green';
  } else if (ratio < 0.5) {
    return 'yellow';
  } else if (ratio < 0.75) {
    return 'orange';
  }
  return 'red';
};

export default calColor;
