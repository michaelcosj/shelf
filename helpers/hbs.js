const dayjs = require("dayjs");

module.exports = {
  formatDate: (date) => {
    return dayjs(date).format("MM-DD-YYYY");
  },
};
