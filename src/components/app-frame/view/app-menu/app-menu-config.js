import configuredRoutes from "configs/routes";

let routesMap = {};
configuredRoutes.forEach(route => {
  routesMap[route.path] = route;
});

let menuEntries = [
  { to: "/current-version", labelKey: "currentVersion.title" },
  { to: "/transactions-log", labelKey: "transactionsLog.title" }
];

export default menuEntries;
