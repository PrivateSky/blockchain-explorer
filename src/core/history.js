import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

export default (typeof document !== "undefined" ? createBrowserHistory() : createMemoryHistory());
