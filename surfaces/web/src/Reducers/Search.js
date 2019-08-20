const initState = {
  autocomplete: [],
  hits: [],
  display: [],
  searchText: "",
  disableRateRanger: false,
  disableDefaultSort: false,
  disableStarRanger: false,
  disableClearFilter: true,
  openCompose: false,
};

export default function Search(state=initState, action) {
  switch (action.type) {
    case "UPDATE_DISABLE_RATE_RANGER": {
      return {
        ...state,
        disableRateRanger: action.payload.val,
      };
    }

    case "UPDATE_OPEN_COMPOSE": {
      return {
        ...state,
        openCompose: action.payload.val,
      };
    }

    case "UPDATE_DISABLE_DEFAULT_SORT": {
      return {
        ...state,
        disableDefaultSort: action.payload.val,
      };
    }

    case "UPDATE_DISABLE_STAR_RANGER": {
      return {
        ...state,
        disableStarRanger: action.payload.val,
      };
    }

    case "UPDATE_DISABLE_CLEAR_FILTER": {
      return {
        ...state,
        disableClearFilter: action.payload.val,
      };
    }

    case "CLEAR_ALL_FILTER": {
      var oldList = state.hits;
      return {
        ...state,
        disableRateRanger: false,
        disableDefaultSort: false,
        disableStarRanger: false,
        disableClearFilter: true,
        display: oldList,
      };
    }

    case "UPDATE_AUTOCOMPLETE": {
      return {
        ...state,
        autocomplete: action.payload.list,
      };
    }

    case "UPDATE_HITS": {
      return {
        ...state,
        hits: action.payload.val,
      };
    }

    case "UPDATE_DISPLAY": {
      return {
        ...state,
        display: action.payload.val,
      };
    }

    case "UPDATE_SEARCH_TEXT": {
      return {
        ...state,
        searchText: action.payload.val,
      };
    }

    default: return state;
  }
}
