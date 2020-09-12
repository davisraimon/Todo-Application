import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Button, Input, Select, Divider } from "antd";
import "antd/dist/antd.css";
import "../App.css";
import { addTodo } from "../actions/todoActions";
import { connect } from "react-redux";
const { Option } = Select;

const FormComponent = ({ addTodo }) => {
  const [items, setItems] = useState({
    buckets: JSON.parse(localStorage.getItem("buckets")) || ["Important"],
    newBucket: "",
  });
  const [formData, setFormData] = useState({
    bucket: "Important",
    title: "",
    completed: false,
  });

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
      addTodo(formData);
      clear();
    }
  };
  const clear = () => {
    setFormData({ bucket: "Important", title: "" });
  };
  const onChangeTitle = (value) => {
    setFormData({ ...formData, title: value });
  };
  const onChangeBucket = (value) => {
    setFormData({ ...formData, bucket: value });
  };

  return (
    <div>
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
                placeholder="Select a Category"
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
                        Add Category
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
            <Form.Item name="title">
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
          <Col xs={24} sm={24} md={7} lg={5} xl={4}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => onClickSubmit(e)}
              block
            >
              {/* <PlusCircleFilled /> */}
              Remember this
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

FormComponent.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo })(FormComponent);
