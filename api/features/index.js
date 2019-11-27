const DataController = require("./data");

module.exports = (function exports() {
  function init(app) {
    new DataController(app).init("/api/data");
  }

  return {
    init: init
  };
})();
