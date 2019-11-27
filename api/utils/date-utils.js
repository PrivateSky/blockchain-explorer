const addUTCDays = function(date, daysToAdd) {
  const desiredDate = new Date(date.valueOf());
  desiredDate.setUTCDate(desiredDate.getUTCDate() + daysToAdd);
  return desiredDate;
};

const addUTCDaysFromNow = function(daysToAdd) {
  const desiredDate = new Date();
  desiredDate.setUTCDate(desiredDate.getUTCDate() + daysToAdd);
  return desiredDate;
};

module.exports = {
  addUTCDays: addUTCDays,
  addUTCDaysFromNow: addUTCDaysFromNow
};
