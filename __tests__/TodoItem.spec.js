import React from "react";
import { shallow, configure, render, mount } from "enzyme";
import TodoItem from "../src/components/TodoItem";
import Adapter from "enzyme-adapter-react-16";
import store from "../src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

//Use array destructuring to create mock functions.
let [removeTodo, updateTodo, setLoadingTrue] = new Array(3).fill(jest.fn());

//Setting up our Enzyme wrapper
function shallowSetup() {
  configure({ adapter: new Adapter() });
  // Sample props to pass to our shallow render
  const props = {
    id: 12,
    bucket: "Important",
    title: "Do Exercise",
    completed: false,
    removeTodo: removeTodo,
    updateTodo: updateTodo,
    setLoadingTrue: setLoadingTrue,
  };

  // wrapper instance around rendered output
  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <TodoItem store={store} {...props} />
      </MemoryRouter>
    </Provider>
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe("Checking Rendering of TodoItem Individually", () => {
  it("should render a todo item with the details of the Todo", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    expect(enzymeWrapper.find(".todo-tag").find("span").text()).toBe(
      props.title
    );
    expect(enzymeWrapper.find(".todo-tag-bucket").find("span").text()).toBe(
      props.bucket
    );
    expect(enzymeWrapper.find(".ant-btn-dangerous").text()).toBe("X");
    expect(enzymeWrapper.find(".ant-list-item").length).toEqual(1);
    expect(enzymeWrapper.find(".ant-switch").length).toEqual(1);
  });
});

describe("Checking Rendering todoitem in both states", () => {
  const { enzymeWrapper, props } = shallowSetup();
  if (props.completed) {
    it("Checking Rendering --completed-- TodoItem Individually", () => {
      // Setup wrapper and assign props.
      const { enzymeWrapper, props } = shallowSetup();
      expect(enzymeWrapper.find(".anticon-close").length).toEqual(0);
      expect(enzymeWrapper.find(".anticon-check").length).toEqual(1);
      expect(
        enzymeWrapper.find("span").find(".todo-tag-completed").length
      ).toEqual(1);
      expect(enzymeWrapper.find(".ant-tag-cyan").length).toEqual(1);
    });
  } else {
    it("Checking Rendering --not completed-- TodoItem Individually", () => {
      // Setup wrapper and assign props.
      const { enzymeWrapper, props } = shallowSetup();
      expect(enzymeWrapper.find(".anticon-close").length).toEqual(1);
      expect(enzymeWrapper.find(".anticon-check").length).toEqual(0);
      expect(enzymeWrapper.find(".todo-tag-completed").length).toEqual(0);
      expect(
        enzymeWrapper.find("span").find(".todo-tag-completed").length
      ).toEqual(0);
      expect(enzymeWrapper.find(".ant-tag-red").length).toEqual(1);
    });
  }
});

describe("Checking Delete Click Events", () => {
  it("checking the delete button", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    expect(enzymeWrapper.find(".ant-popconfirm").length).toEqual(0);
    expect(enzymeWrapper.find(".ant-btn-dangerous"));
    enzymeWrapper.find(".ant-btn-dangerous").simulate("click");
    expect(enzymeWrapper.find(".ant-popover-hidden").length).toEqual(0);
    expect(enzymeWrapper.find(".ant-popover-message-title").text()).toBe(
      "Are you sure you want to delete?"
    );
    const cancel = enzymeWrapper
      .find(".ant-popover-buttons")
      .find("button")
      .at(0);
    cancel.simulate("click");
    expect(enzymeWrapper.find(".ant-popover-hidden").length).toEqual(2);

    enzymeWrapper.find(".ant-btn-dangerous").simulate("click");
    const ok = enzymeWrapper.find(".ant-popover-buttons").find("button").at(1);
    ok.simulate("click");
  });
});

describe("Checking Edit Click Event", () => {
  it("checking the edit button", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    const edit = enzymeWrapper.find("#edit").find("a");
    edit.simulate("click");
    expect(edit.prop("href")).toBe(`/edit/${props.id}`);
  });
});

describe("Checking Switch Click Event", () => {
  it("toggling the switch button", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    const switchButton = enzymeWrapper.find(".ant-switch");
    if (props.completed) {
      expect(enzymeWrapper.find(".ant-switch-checked").length).toEqual(1);
      switchButton.simulate("click");
      expect(enzymeWrapper.find(".ant-switch-checked").length).toEqual(0);
    } else {
      expect(enzymeWrapper.find(".ant-switch-checked").length).toEqual(0);
      switchButton.simulate("click");
      expect(enzymeWrapper.find(".ant-switch-checked").length).toEqual(1);
    }
  });
});
