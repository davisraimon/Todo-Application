import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from "antd";
import { CloseOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { removeTodo, updateTodo, setLoadingTrue } from "../actions/todoActions";
import { Link } from "react-router-dom";
import "../App.css";

const TodoItem = ({
  id,
  bucket,
  title,
  completed,
  removeTodo,
  updateTodo,
  setLoadingTrue,
}) => {
  const [completedStatus, setCompletedStatus] = useState(completed);
  const onTodoToggle = () => {
    setCompletedStatus(!completedStatus);
    updateTodo(id, { bucket: bucket, title: title, completed: !completed });
  };
  return (
    <List.Item
      actions={[
        <Tooltip
          title={completedStatus ? "Mark as uncompleted" : "Mark as completed"}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle()}
            defaultChecked={completedStatus}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            removeTodo(id);
          }}
        >
          <Button
            className="remove-todo-button"
            type="primary"
            shape="circle"
            danger
          >
            X
          </Button>
        </Popconfirm>,
        <Button className="remove-todo-button" type="primary" shape="circle">
          <Link
            to={`/edit/${id}`}
            onClick={() => {
              setLoadingTrue();
            }}
          >
            <EditOutlined />
          </Link>
        </Button>,
      ]}
    >
      <div className="hide-sm">
        <Tag className="todo-tag-bucket">{bucket}</Tag>
      </div>
      <div className="todo-item">
        <Tag
          color={completedStatus ? "cyan" : "red"}
          className={`${
            completed ? "todo-tag todo-tag-completed " : "todo-tag"
          }`}
        >
          {title}
        </Tag>
      </div>
    </List.Item>
  );
};

TodoItem.propTypes = {
  bucket: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  updateTodo: PropTypes.func.isRequired,
  setLoadingTrue: PropTypes.func.isRequired,
};

export default connect(null, { removeTodo, updateTodo, setLoadingTrue })(
  TodoItem
);
