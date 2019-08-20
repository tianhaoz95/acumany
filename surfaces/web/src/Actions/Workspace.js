export function updateSiderCollapsed(val) {
  return {
    type: "UPDATE_SIDER_COLLAPSED",
    payload: {val: val}
  };
}

export const updateSessionState = (val = false) => {
  return {
    type: "SESSION_IN_PROGRESS",
    payload: val
  }
};
