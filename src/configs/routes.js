import CurrentVersion from "features/current-version-page";
import TransactionsLog from "features/transactions-log-page";

const routes = [
  {
    exact: true,
    path: "/",
    component: CurrentVersion
  },
  {
    path: "/current-version/:assetType?/:assetId?/:txId?",
    component: CurrentVersion
  },
  {
    path: "/transactions-log",
    component: TransactionsLog
  }
];

export default routes;
