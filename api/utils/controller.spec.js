const { sinon, expect } = require("../test");

const Controller = require("./controller");

const methodsWithRequiredInput = ["POST", "PUT"];

describe("Controller", () => {
  let controller;

  beforeEach(function() {
    controller = new Controller();
  });

  afterEach(function() {
    sinon.restore();
  });

  methodsWithRequiredInput.forEach(method => {
    it(`defaultInputFilter should trim input object properties for ${method} requests`, () => {
      let nextSpy = sinon.spy();

      let req = { method, body: { name: " name ", inner: { name: " name " } } };

      controller.defaultInputFilter(req, {}, nextSpy);

      expect(nextSpy.calledOnce);
      expect(req.body).to.deep.equal({ name: "name", inner: { name: "name" } });
    });

    it(`defaultInputFilter should return bad request on empty ${method} input`, () => {
      let sendBadRequestSpy = sinon.spy();
      let nextSpy = sinon.spy();

      let req = { method, body: undefined };
      let res = { sendBadRequest: sendBadRequestSpy };

      controller.defaultInputFilter(req, res, nextSpy);

      expect(sendBadRequestSpy.calledOnce);
      expect(nextSpy.callCount == 0, "next should not be called");
    });
  });
});
