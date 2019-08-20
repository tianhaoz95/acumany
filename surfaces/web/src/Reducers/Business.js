const initState = {
  currentIndex: 0,
  plansLoading: true,
  plans: [],
  selectedPlan: null,
  verifyCardStatus: "none",
  cardObj: null,
  cardInfo: null,
  basicStatus: "none",
  basicObj: null,
  submitLoading: false,
  submitError: false,
};

export default function Business(state=initState, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_INDEX": {
      return {
        ...state,
        currentIndex: action.payload.val,
      };
    }

    case "UPDATE_SUBMIT_LOADING": {
      return {
        ...state,
        submitLoading: action.payload.val,
      };
    }

    case "UPDATE_SUBMIT_ERROR": {
      return {
        ...state,
        submitError: action.payload.val,
      };
    }

    case "UPDATE_CARD_INFO": {
      return {
        ...state,
        cardInfo: action.payload.val,
      };
    }

    case "UPDATE_BASIC_OBJECT": {
      return {
        ...state,
        basicObj: action.payload.val,
      };
    }

    case "UPDATE_BASIC_STATUS": {
      return {
        ...state,
        basicStatus: action.payload.val,
      };
    }

    case "UPDATE_CARD_OBJECT": {
      return {
        ...state,
        cardObj: action.payload.val,
      };
    }

    case "UPDATE_VERIFY_CARD_STATUS": {
      return {
        ...state,
        verifyCardStatus: action.payload.val,
      };
    }

    case "UPDATE_SELECTED_PLAN": {
      return {
        ...state,
        selectedPlan: action.payload.val,
      };
    }

    case "UPDATE_PLANS": {
      return {
        ...state,
        plans: action.payload.val,
      };
    }

    case "UPDATE_PLANS_LOADING": {
      return {
        ...state,
        plansLoading: action.payload.val,
      };
    }

    default: return state;
  }
}
