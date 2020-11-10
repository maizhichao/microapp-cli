export const INIT_APP = "INITIALIZE_APP";
export const SHOW_SPIN = "SHOW_SPIN";

export const showSpin = status => {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_SPIN,
      status: status
    });
  };
};

export const initialize = () => {
  return (dispatch, getState) => {
    return dispatch({
      type: INIT_APP
    });
  };
};
