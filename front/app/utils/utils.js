export const calculateDaysRemaining = (deadlineTimestamp) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Sigue siendo número
  const secondsRemaining = Number(deadlineTimestamp) - currentTimestamp; // Convertimos BigInt a número
  const daysRemaining = Math.ceil(secondsRemaining / (60 * 60 * 24));
  return daysRemaining > 0 ? daysRemaining : 0;
};

export const timestampToDate = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString();
};

export const STATES = {
  ACTIVE: 0n,
  SUCCESSFUL: 1n,
  EXPIRED: 2n,
};

export const MAP_STATES = {
  0n: "Activa",
  1n: "Exitosa",
  2n: "Vencida",
};

export const MAP_STATES_COLORS = {
  0n: "primary",
  1n: "success",
  2n: "error",
};
