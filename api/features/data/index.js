const Controller = require("../../utils/controller");
const datatService = require("./data-service");

class DataController extends Controller {
  registerRoutes() {
    const self = this;
    const router = this.router;

    router
      .route("/current-version")
      .all(self.defaultInputFilter)
      .get((req, res) => {
        let forceRefresh = !!req.query.forceRefresh;

        datatService
          .getCurrentVersionData({ forceRefresh })
          .then(result => {
            res.sendOk(result);
          })
          .catch(error => res.sendInternalError(error));
      });

    router
      .route("/transactions-log")
      .all(self.defaultInputFilter)
      .get((req, res) => {
        let forceRefresh = !!req.query.forceRefresh;

        datatService
          .getTransactionsLog({ forceRefresh })
          .then(result => {
            res.sendArray(result);
          })
          .catch(error => res.sendInternalError(error));
      });
  }
}

module.exports = DataController;
