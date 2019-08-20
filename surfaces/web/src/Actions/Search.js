import * as Tracking from "../Utilities/Tracking";

import _ from 'lodash';
import { push } from 'react-router-redux';
import { refreshSkillAutocomplete } from '../Components/Async/Search';

export function newSearch(searchText) {
  return (dispatch, getState) => {
    if (searchText === "") {
      return;
    }
    Tracking.search(searchText);
    var path = getState().router.location.pathname;
    if (path !== "/search") {
      dispatch(push("/search"));
      dispatch(updateSearchText(searchText));
    } else {
      dispatch(updateSearchText(searchText));
    }
  };
}

export function updateOpenCompose(val) {
  return {
    type: "UPDATE_OPEN_COMPOSE",
    payload: { val: val }
  };
}

export function refreshAutocompleteList() {
  return (dispatch, getState) => {
    refreshSkillAutocomplete()
    .then((snap) => {
      dispatch({
        type: "UPDATE_AUTOCOMPLETE",
        payload: { list: snap.data }
      });
    })
    .catch((err) => {
      console.log("network error");
    });
  };
}

export function updateSearchText(val) {
  return {
    type: "UPDATE_SEARCH_TEXT",
    payload: { val: val }
  };
}

export function updateHits(val) {
  return {
    type: "UPDATE_HITS",
    payload: { val: val }
  };
}

export function updateDisplay(val) {
  return {
    type: "UPDATE_DISPLAY",
    payload: { val: val }
  };
}

export function sortDisplayList(attr, type) {
  return (dispatch, getState) => {
    var oldList = getState().search.display;
    var newList = _.orderBy(oldList, [attr], [type]);
    dispatch({
      type: "UPDATE_DISPLAY",
      payload: { val: newList }
    });
  }
}

export function applyRateRange(range) {
  return (dispatch, getState) => {
    var lowwerBound = range[0];
    var upperBound = range[1];
    var oldList = getState().search.display;
    var newList = _.filter(oldList, (val) => {
      return ((val.rate <= upperBound) && (val.rate >= lowwerBound));
    });
    dispatch({
      type: "UPDATE_DISPLAY",
      payload: { val: newList }
    });
  };
}

export function applyStarRange(lowwerBound) {
  return (dispatch, getState) => {
    var oldList = getState().search.display;
    var newList = _.filter(oldList, (val) => {
      return (val.star >= lowwerBound);
    });
    dispatch({
      type: "UPDATE_DISPLAY",
      payload: { val: newList }
    });
  };
}

export function resetList() {
  return (dispatch, getState) => {
    var oldList = getState().search.hits;
    dispatch({
      type: "UPDATE_DISPLAY",
      payload: { val: oldList }
    });
  }
}

export function disableDefaultSort() {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DISABLE_DEFAULT_SORT",
      payload: { val: true }
    });
    dispatch(enableClearFilterButton());
  };
}

export function disableRateRanger() {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DISABLE_RATE_RANGER",
      payload: { val: true }
    });
    dispatch(enableClearFilterButton());
  };
}

export function disableStarRanger() {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DISABLE_STAR_RANGER",
      payload: { val: true }
    });
    dispatch(enableClearFilterButton());
  };
}

export function enableClearFilterButton() {
  return {
    type: "UPDATE_DISABLE_CLEAR_FILTER",
    payload: { val: false }
  };
}

export function clearAllFilter() {
  return {
    type: "CLEAR_ALL_FILTER",
    payload: null,
  };
}


export function openAdvisorProfile(uid) {
  return (dispatch, getState) => {
    var url = "/profile/" + uid;
    dispatch(push(url));
  };
}
