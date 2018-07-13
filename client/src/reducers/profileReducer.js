import {
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
