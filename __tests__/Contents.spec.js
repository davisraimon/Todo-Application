import React from "react";
import { shallow, configure, render, mount } from "enzyme";
import Contents from "../src/components/Contents";
import Adapter from "enzyme-adapter-react-16";
import store from "../src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

//Use array destructuring to create mock functions.
let [getTodo] = new Array(1).fill(jest.fn());

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
    todoReducer: {
      todoList: [],
      editmode: false,
      loading: false,
    },
    getTodo: getTodo,
  };

  // wrapper instance around rendered output
  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Contents store={store} {...props} />
      </MemoryRouter>
    </Provider>
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe("Checking Rendering of whole contents", () => {
  it("should render a todo item with the details of the Todo", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    act(() => {
      store.dispatch({
        type: "GET_TODO",
        payload: [
          {
            _id: { $oid: "5f5e304c13ff03fc6c217ed2" },
            bucket: "Important",
            title: "Buy 12 Eggs",
            completed: false,
          },
          {
            _id: { $oid: "5f5d032fcda05acd7b89ff08" },
            bucket: "Important",
            title: "Do Exercise",
            completed: true,
          },
          {
            _id: { $oid: "5f5cf915cda05acd7b89ff07" },
            bucket: "Important",
            title: "Water Plants",
            completed: false,
          },
          {
            _id: { $oid: "5f5cba778b6b60de8dd65b6a" },
            bucket: "Grocery",
            title: "Buy Milk",
            completed: false,
          },
        ],
      });
    });
    enzymeWrapper.setProps({ loading: false });
    expect(enzymeWrapper.find(".ant-list-item").length).toEqual(4);
    act(() => {
      store.dispatch({
        type: "GET_TODO",
        payload: [],
      });
    });
    enzymeWrapper.setProps({ loading: false });
    expect(enzymeWrapper.find("h4").text()).toBe("Nothing to do!");
  });
});
