import { GET_TODO, GET_TODO_BY_ID, CLEAR_TODO_BY_ID } from "../actions/types";

const initialState = {
  todoList: [],
  todoItem: {},
  loading: true,
  editmode: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TODO:
      return {
        ...state,
        todoList: payload,
        loading: false,
        editmode: false,
      };
    case GET_TODO_BY_ID:
      return { ...state, todoItem: payload, loading: false, editmode: true };
    case CLEAR_TODO_BY_ID:
      return { ...state, todoItem: {}, loading: true, editmode: false };
    default:
      return { ...state };
  }
}
