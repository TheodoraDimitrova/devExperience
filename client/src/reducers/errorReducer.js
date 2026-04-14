import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};
const normalizeErrors = payload => {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return payload;
  }
  if (typeof payload === "string") {
    return { general: payload };
  }
  return {};
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return normalizeErrors(action.payload);
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
