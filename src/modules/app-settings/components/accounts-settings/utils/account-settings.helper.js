export const formatDays = (days, dayOptions) => {
  const mappedDays = days.map((day) =>
    dayOptions.find((dayOption) => dayOption.value === day)
  );
  return mappedDays.map((mapDay) => mapDay.day);
};

export const formatTime = (time, hourOptions) => {
  const matchingHour = hourOptions.find((hour) => hour.value === time);
  return matchingHour.hour;
};
