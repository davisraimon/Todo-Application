import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Divider,
  Spin,
  Space,
} from "antd";
import "antd/dist/antd.css";
import "../App.css";
import { updateTodo, getTodoById, clearTodoById } from "../actions/todoActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const { Option } = Select;

const EditTodo = ({
  updateTodo,
  getTodoById,
  clearTodoById,
  match,
  todoReducer: { todoItem, editmode, loading },
  history,
}) => {
  const [items, setItems] = useState({
    buckets: JSON.parse(localStorage.getItem("buckets")) || [
      "Important",
      "Medium",
    ],
    newBucket: "",
  });

  const [formData, setFormData] = useState({
    bucket: "",
    title: "",
    completed: false,
  });

  useEffect(() => {
    if (todoItem[0] === undefined) {
      getTodoById(match.params.id);
    }
    setFormData({
      bucket: todoItem[0] !== undefined ? todoItem[0].bucket : "",
      title: todoItem[0] !== undefined ? todoItem[0].title : "",
      completed: todoItem[0] !== undefined ? todoItem[0].completed : "",
    });
  }, [editmode]);

  const { buckets, newBucket } = items;
  const { bucket, title, completed } = formData;

  const onAddBucket = () => {
    // Adding new Bucket to existing BucketList
    const newBucketList = [
      ...buckets,
      newBucket || `New item ${buckets.length++}`,
    ];
    // Updating the buckets state with newBucket
    setItems({
      buckets: newBucketList,
      newBucket: "",
    });
    // Saving the newBucketList to cache
    localStorage.setItem("buckets", JSON.stringify(newBucketList));
  };

  const onChangeBucketField = (e) => {
    setItems({ buckets: [...buckets], newBucket: e.target.value });
  };
  const [error, setError] = useState(false);
  const validate = () => {
    if (title === "") {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };
  const onClickSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateTodo(match.params.id, formData);
      clearTodoById();
      history.push("/");
    }
  };

  const onChangeTitle = (value) => {
    setFormData({ ...formData, title: value });
  };

  const onChangeBucket = (value) => {
    setFormData({ ...formData, bucket: value });
  };

  return (
    <div>
      {loading ? (
        <Space>
          <Spin />
        </Space>
      ) : (
        <Form
          layout="horizontal"
          className="todo-form"
          style={{ marginTop: 20, marginBottom: 20, padding: 5 }}
        >
          <Row gutter={20}>
            <Col xs={24} sm={24} md={7} lg={5} xl={4}>
              <Form.Item>
                <Select
                  value={bucket}
                  onChange={(value) => {
                    onChangeBucket(value);
                  }}
                  placeholder="Select a bucket"
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          padding: 8,
                          height: 48,
                        }}
                      >
                        <Input
                          style={{ flex: "auto" }}
                          value={newBucket}
                          placeholder="Grocery"
                          onChange={(e) => {
                            onChangeBucketField(e);
                          }}
                        />
                        <a
                          style={{
                            flex: "none",
                            padding: "8px",
                            display: "block",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            onAddBucket();
                          }}
                        >
                          Add Bucket
                        </a>
                      </div>
                    </div>
                  )}
                >
                  {buckets.map((bucket) => (
                    <Option key={bucket} value={bucket}>
                      {bucket}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={10} lg={14} xl={16}>
              <Form.Item
                initialValue={title}
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input
                  placeholder="What needs to be done?"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    onChangeTitle(e.target.value);
                  }}
                />
                <span className={`${error ? "error" : "no-error"}`}>
                  *This field is required
                </span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={4} lg={3} xl={2}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => onClickSubmit(e)}
                block
              >
                {/* <PlusCircleFilled /> */}
                Update
              </Button>
            </Col>
            <Col xs={24} sm={24} md={3} lg={3} xl={2}>
              <Link to="/" onClick={clearTodoById}>
                {/* <PlusCircleFilled /> */}
                Cancel
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

updateTodo.propTypes = {
  updateTodo: PropTypes.func.isRequired,
  getTodoById: PropTypes.func.isRequired,
  clearTodoById: PropTypes.func.isRequired,
  todoReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  todoReducer: state.todoReducer,
});
export default connect(mapStateToProps, {
  updateTodo,
  getTodoById,
  clearTodoById,
})(EditTodo);
