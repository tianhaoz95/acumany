export function updateLoginPopover(val) {
  return {
    type: "UPDATE_LOGIN_POPOVER",
    payload: { val: val }
  };
}

export function updateSignUpPopover(val) {
  return {
    type: "UPDATE_SIGNUP_POPOVER",
    payload: { val: val }
  };
}

export function updateSignUpLoading(val) {
  return {
    type: "UPDATE_SIGNUP_LOADING",
    payload: { val: val }
  };
}

export function updateLoginLoading(val) {
  return {
    type: "UPDATE_LOGIN_LOADING",
    payload: { val: val }
  };
}

export function updateLoginError(val) {
  return {
    type: "UPDATE_LOGIN_ERROR",
    payload: { val: val }
  };
}

export function updateSignUpError(val) {
  return {
    type: "UPDATE_SIGNUP_ERROR",
    payload: { val: val }
  };
}
