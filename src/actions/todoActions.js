import { GET_TODO, GET_TODO_BY_ID, CLEAR_TODO_BY_ID } from "./types";
import axios from "axios";
import { message } from "antd";

export const getTodo = () => async (dispatch) => {
  try {
    const res = await axios.get("/get-todo");
    dispatch({ type: GET_TODO, payload: res.data });
  } catch (err) {
    message.error("Server Error");
  }
};
export const getTodoById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/get-todo/${id}`);
    dispatch({ type: GET_TODO_BY_ID, payload: res.data });
  } catch (err) {
    message.error("Server Error");
  }
};
export const clearTodoById = () => async (dispatch) => {
  dispatch({ type: CLEAR_TODO_BY_ID, payload: "" });
};
export const addTodo = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/add-todo", data, config);
    dispatch({ type: GET_TODO, payload: res.data });
    message.success("Added");
  } catch (err) {
    message.error("Server Error");
  }
};
export const removeTodo = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/delete-todo/${id}`);
    dispatch({ type: GET_TODO, payload: res.data });
    message.warn("Removed");
  } catch (err) {
    message.error("Server Error");
  }
};
export const updateTodo = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/edit-todo//${id}`, data, config);
    dispatch({ type: GET_TODO, payload: res.data });
    message.success("Updated");
  } catch (err) {
    message.error("Server Error");
  }
};
