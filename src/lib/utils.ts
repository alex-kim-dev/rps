export const genRandomInRange = (start = 0, end = 10) => {
  const first = Number.isNaN(start) ? 0 : start;
  const second = Number.isNaN(end) ? 0 : end;

  const from = Math.max(Number.MIN_SAFE_INTEGER, Math.min(first, second));
  const to = Math.min(Number.MAX_SAFE_INTEGER, Math.max(first, second));

  return Math.floor(from + Math.random() * (to - from));
};
