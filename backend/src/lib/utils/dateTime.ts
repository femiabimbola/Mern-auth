export const fortyFiveMinutesFromNow = (): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now.toISOString(); // Converts the date to a string in ISO format
};