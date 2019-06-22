const calculatePercentage = perc => {
  if (perc <= 50) {
    // between 0 to 50 percent
    return `linear-gradient(${90 + 360 * 0.01 * perc}deg, transparent 50%, #b48e6b 50%), linear-gradient(90deg, #b48e6b 50%, transparent 50%)`;
    // to remove border at the bottom half of the circle
  }
  // between 50 percent to 100
  else {
    if (perc > 100) {
      perc = 100;
    }
    // highlight the right half of the circle
    return `linear-gradient(90deg, transparent 50%, #68503a 50%), linear-gradient(${-90 + 360 * 0.01 * (perc - 50)}deg, transparent 50%, #b48e6b 50%)`;
  }
};

export { calculatePercentage };
