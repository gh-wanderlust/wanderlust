import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Index from "../pages/index";

describe("With Enzyme", () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<Index />);

    expect(app.find("p").text()).toEqual("Hello World!");
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<Index />)
//     const tree = component.toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })
