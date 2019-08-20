// Redux store is configured in this file

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import AdvisorCredential from './AdvisorCredential';
import AdvisorIntro from './AdvisorIntro';
import AdvisorSchedule from './AdvisorSchedule';
import Auth from './Auth';
import AvatarField from './AvatarField';
import BasicInfoField from './BasicInfoField';
import Business from './Business';
import Contact from './Contact';
import Enterprise from './Enterprise';
import Header from './Header';
import ReduxThunk from 'redux-thunk';
import Search from './Search';
import Session from './Session';
import SkillList from './SkillList';
import Workspace from './Workspace';
import history from '../History';
import promiseMiddleware from 'redux-promise-middleware';

var reducers = combineReducers({
  auth: Auth,
  search: Search,
  header: Header,
  business: Business,
  workspace: Workspace,
  avatar: AvatarField,
  basicInfoField: BasicInfoField,
  advisorIntro: AdvisorIntro,
  advisorCredential: AdvisorCredential,
  skillList: SkillList,
  contact: Contact,
  session: Session,
  enterprise: Enterprise,
  advisorSchedule: AdvisorSchedule,
  router: routerReducer,
});

const middlewares = [
  promiseMiddleware(),
  ReduxThunk,
  routerMiddleware(history)
];

// check if dev tools exist in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(
  reducers,
  // compose function from right to left
  composeEnhancers(
    applyMiddleware(...middlewares),
    autoRehydrate(),
  )
);

// persist the state for localStorage in the browser
// {type: "persist/REHYDRATE", ...}
export const persistor = persistStore(store);

export default store;
