import React from "react";
import { shallow, configure, render, mount } from "enzyme";
import EditTodo from "../src/components/EditTodo";
import Adapter from "enzyme-adapter-react-16";
import store from "../src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

//Use array destructuring to create mock functions.
let [updateTodo, getTodoById, clearTodoById] = new Array(3).fill(jest.fn());
const historyMock = { push: jest.fn() };
//Setting up our Enzyme wrapper
function shallowSetup() {
  // Initializing window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  configure({ adapter: new Adapter() });
  // Sample props to pass to our shallow render
  const props = {
    match: { params: { id: 12 } },
    todoReducer: {
      todoItem: [],
      editmode: false,
      loading: false,
    },
    updateTodo: updateTodo,
    getTodoById: getTodoById,
    clearTodoById: clearTodoById,
    history: historyMock,
  };

  // wrapper instance around rendered output
  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <EditTodo store={store} {...props} />
      </MemoryRouter>
    </Provider>
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe("Checking Rendering of Form component", () => {
  it("check whether components are displayed properly", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    act(() => {
      store.dispatch({
        type: "GET_TODO_BY_ID",
        payload: [
          {
            id: 12,
            bucket: "Important",
            title: "Do Exercise",
            completed: false,
          },
        ],
      });
    });
    enzymeWrapper.setProps({ loading: false });
    expect(enzymeWrapper.find(".ant-btn-primary").text()).toBe("Update");
    const inputField = enzymeWrapper.find(".ant-input");
    inputField.simulate("focus");
    inputField.simulate("change", { target: { value: "" } });
    enzymeWrapper.find("button").simulate("click");
    expect(enzymeWrapper.find(".error").length).toEqual(1);
    expect(enzymeWrapper.find(".error").text()).toBe("*This field is required");
    inputField.simulate("focus");
    inputField.simulate("change", { target: { value: "Changed" } });
    enzymeWrapper.find("button").simulate("click");
    expect(enzymeWrapper.find(".error").length).toEqual(0);
  });
});
