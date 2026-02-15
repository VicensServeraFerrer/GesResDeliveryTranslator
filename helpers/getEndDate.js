export function getEndDate(period) {
  const end = new Date();

  if (period === "monthly") {
    end.setMonth(end.getMonth() + 1);
  } else if (period === "yearly") {
    end.setFullYear(end.getFullYear() + 1);
  } else {
    throw new Error(`Invalid period: ${period}`);
  }

  return end;
}
