import React from "react";
import { shallow, configure, render, mount } from "enzyme";
import FormComponent from "../src/components/FormComponent";
import Adapter from "enzyme-adapter-react-16";
import store from "../src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

//Use array destructuring to create mock functions.
let [addTodo] = new Array(1).fill(jest.fn());

//Setting up our Enzyme wrapper
function shallowSetup() {
  //   Initializing window.matchMedia
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
    addTodo: addTodo,
  };

  // wrapper instance around rendered output
  const enzymeWrapper = mount(
    <Provider store={store}>
      <FormComponent store={store} {...props} />
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

    expect(enzymeWrapper.find(".ant-select-selection-item").text()).toBe(
      "Important"
    );
    expect(enzymeWrapper.find(".ant-btn-primary").text()).toBe("Remember this");
    enzymeWrapper.find("button").simulate("click");

    expect(enzymeWrapper.find(".error").length).toEqual(1);
    expect(enzymeWrapper.find(".error").text()).toBe("*This field is required");
    const inputField = enzymeWrapper.find(".ant-input");
    inputField.simulate("focus");
    inputField.simulate("change", { target: { value: "Changed" } });
    enzymeWrapper.find("button").simulate("click");
    expect(enzymeWrapper.find(".error").length).toEqual(0);
  });
});
