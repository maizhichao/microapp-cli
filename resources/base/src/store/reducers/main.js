const initialState = {
  spinning: false
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case "INITIALIZE_APP":
      return state;
    case "SHOW_SPIN":
      return {
        ...state,
        spinning: action.status
      };
    default:
      return state;
  }
}
