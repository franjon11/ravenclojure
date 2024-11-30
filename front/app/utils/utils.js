export const calculateDaysRemaining = (deadlineTimestamp) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Sigue siendo número
  const secondsRemaining = Number(deadlineTimestamp) - currentTimestamp; // Convertimos BigInt a número
  const daysRemaining = Math.ceil(secondsRemaining / (60 * 60 * 24));
  return daysRemaining > 0 ? daysRemaining : 0;
};
