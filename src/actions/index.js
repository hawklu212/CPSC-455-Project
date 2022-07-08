export const template = (element) => {
  return {
    type: "TEMPLATE_CASE",
    payload: element,
  };
};

export const toggleDrawerState = (element) => {
  return {
    type: "TOGGLE_STATE",
    payload: element,
  };
};

export const loginState = (element) => {
  return {
    type: "LOGIN",
    payload: element,
  };
};
