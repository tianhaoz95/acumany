const initState = {
  list: [],
};

export default function SkillList(state=initState, action) {
  switch (action.type) {
    case "UPDATE_PROFILE_SKILL_LIST": {
      return {
        ...state,
        list: action.payload.list,
      };
    }

    default: return state;
  }
}
