function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    daysInMonth,
    formatSeconds
  };
}
