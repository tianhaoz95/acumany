import * as Tracking from "./Utilities/Tracking";

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

history.listen((location) => {
  Tracking.pageAccess(location.pathname);
});


export default history;
