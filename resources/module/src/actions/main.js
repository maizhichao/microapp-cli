export const Action = {
  TEST_REQUEST: "main/TEST_REQUEST",
  TEST_SUCCESS: "main/TEST_SUCCESS",
  TEST_FAILURE: "main/TEST_FAILURE"
};
export function test() {
  return async dispatch => {
    try {
      dispatch({
        type: Action.TEST_REQUEST
      });
      // Doing request and get response.
      const payload = {};
      dispatch({
        type: Action.TEST_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({
        type: Action.TEST_FAILURE,
        payload: error
      });
    }
  };
}
