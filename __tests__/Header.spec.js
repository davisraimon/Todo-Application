import React from "react";
import { shallow, configure, render, mount } from "enzyme";
import Header from "../src/components/Header";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
const props = { title: "TODO APPLICATION" };
const component = mount(<Header {...props} />);

describe("Checking Rendering of Header component", () => {
  it("title should be displayed as header", () => {
    expect(component.find("h3").text()).toBe("TODO APPLICATION");
  });
});
