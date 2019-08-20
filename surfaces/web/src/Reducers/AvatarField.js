const initState = {
  edit: false,
  file: null,
  loading: false,
};

export default function AvatarField(state=initState, action) {
  switch (action.type) {
    case "UPDATE_AVATAR_EDIT": {
      return {
        ...state,
        edit: action.payload.val,
      };
    }

    case "UPDATE_AVATAR_FILE": {
      return {
        ...state,
        file: action.payload.file,
      };
    }

    case "UPDATE_AVATAR_LOADING": {
      return {
        ...state,
        loading: action.payload.val,
      };
    }

    default: return state;
  }
}
