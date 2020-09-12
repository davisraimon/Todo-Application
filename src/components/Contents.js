import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { getTodo } from "../actions/todoActions";
import { List, Spin, Space, Input } from "antd";
import "../App.css";

const Contents = ({
  getTodo,
  todoReducer: { todoList, editmode, loading },
}) => {
  useEffect(() => {
    if (todoList.length === 0) {
      getTodo();
    }
  }, [getTodo]);
  return (
    <div className={`${editmode ? "focus-out" : ""}`}>
      <List style={{ backgroundColor: "white", padding: 5, margin: 5 }}>
        {todoList.length !== 0 ? (
          todoList.map((item) => (
            <TodoItem
              key={item._id.$oid}
              id={item._id.$oid}
              title={item.title}
              completed={item.completed}
              bucket={item.bucket}
            />
          ))
        ) : loading ? (
          <Space>
            <Spin />
          </Space>
        ) : (
          <h4>Nothing to do!</h4>
        )}
      </List>
    </div>
  );
};

Contents.propTypes = {
  getTodo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todoReducer: state.todoReducer,
});
export default connect(mapStateToProps, { getTodo })(Contents);
