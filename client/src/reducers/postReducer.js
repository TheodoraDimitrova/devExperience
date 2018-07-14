import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    DELETE_POST
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    post: {},
    
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
         
        };
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
      default:
        return state;
    }
  }
  