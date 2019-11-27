import { get, post, put } from "./api-fetcher-dispatcher";

const ACTION_TYPE_MOCK = "ACTION_TYPE_MOCK";
const ACTION_TYPE_MOCK_SUCCESS = "ACTION_TYPE_MOCK_SUCCESS";
const ACTION_TYPE_MOCK_ERROR = "ACTION_TYPE_MOCK_ERROR";

const API_RELATIVE_URL = "mock";
const API_URL = "/api/mock";

describe("core::api-fetcher-dispatcher", () => {
  let dispatch;

  beforeEach(() => {
    fetch.resetMocks();
    dispatch = jest.fn();
  });

  describe("get", () => {
    beforeEach(() => {
      fetch.resetMocks();
      dispatch = jest.fn();
    });

    it("should handle simple successful GET request", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof get()).toEqual("function");

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });
      });
    });

    it("should handle simple failed GET request", () => {
      let apiError = { code: "genericError" };
      fetch.mockRejectOnce(apiError);

      expect(typeof get()).toEqual("function");

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_ERROR, response: apiError });
      });
    });

    it("should handle simple successful 204 GET request", () => {
      let apiResponse = { mock: "y" };
      let emptyResponse = {};
      fetch.mockResponseOnce(JSON.stringify(apiResponse), { status: 204 });

      expect(typeof get()).toEqual("function");

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: emptyResponse });
      });
    });

    it("should handle simple successful GET request with invalid JSON response", () => {
      fetch.mockResponseOnce("0: invalidJson");

      expect(typeof get()).toEqual("function");

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        // we cannot test for the error dispatch because we don't have access to the error object
        //expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_ERROR });
      });
    });

    it("should handle simple successful non-200 GET request with valid JSON response", () => {
      fetch.mockResponseOnce(`{code:"error"}`, { status: 300 });

      expect(typeof get()).toEqual("function");

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        // we cannot test for the error dispatch because we don't have access to the error object
        //expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_ERROR });
      });
    });

    it("should handle simple successful non-200 GET request with invalid JSON response", () => {
      fetch.mockResponseOnce("0: invalidJson", { status: 300 });

      expect(typeof get()).toEqual("function");

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        // we cannot test for the error dispatch because we don't have access to the error object
        //expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_ERROR });
      });
    });

    it("should handle successful GET request with throwing onSuccessDispatching", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof get()).toEqual("function");

      let body = {
        name: "test"
      };
      let onSuccessDispatching = jest.fn(({ body: fnBody, response: fnResponse, dispatch: fnDispatch }) => {
        expect(fnBody).toEqual(body);
        expect(fnResponse).toEqual(apiResponse);
        expect(fnDispatch).toEqual(dispatch);
        throw new Error("expected error");
      });

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK, { body, onSuccessDispatching })(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(`${API_URL}?name=test`);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });

        expect(onSuccessDispatching).toHaveBeenCalled();
        expect(onSuccessDispatching).toHaveBeenCalledWith({ body, response: apiResponse, dispatch });
        expect(onSuccessDispatching).toThrow();
      });
    });

    it("should handle complex successful GET request", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof get()).toEqual("function");

      let body = {
        name: "test"
      };
      let onSuccessDispatching = jest.fn(({ body: fnBody, response: fnResponse, dispatch: fnDispatch }) => {
        expect(fnBody).toEqual(body);
        expect(fnResponse).toEqual(apiResponse);
        expect(fnDispatch).toEqual(dispatch);
      });

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK, { body, onSuccessDispatching })(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(`${API_URL}?name=test`);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });

        expect(onSuccessDispatching).toHaveBeenCalled();
        expect(onSuccessDispatching).toHaveBeenCalledWith({ body, response: apiResponse, dispatch });
      });
    });

    it("should handle complex successful GET request with interrupting successful dispatch", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof get()).toEqual("function");

      let body = {
        name: "test"
      };
      let onSuccessDispatching = jest.fn(({ body: fnBody, response: fnResponse, dispatch: fnDispatch }) => {
        expect(fnBody).toEqual(body);
        expect(fnResponse).toEqual(apiResponse);
        expect(fnDispatch).toEqual(dispatch);

        return false;
      });

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK, { body, onSuccessDispatching })(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(`${API_URL}?name=test`);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });

        expect(onSuccessDispatching).toHaveBeenCalled();
        expect(onSuccessDispatching).toHaveBeenCalledWith({ body, response: apiResponse, dispatch });
      });
    });

    it("should handle successful GET request with onSuccessDispatched", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof get()).toEqual("function");

      let body = {
        name: "test"
      };
      let onSuccessDispatched = jest.fn(({ body: fnBody, response: fnResponse, dispatch: fnDispatch }) => {
        expect(fnBody).toEqual(body);
        expect(fnResponse).toEqual(apiResponse);
        expect(fnDispatch).toEqual(dispatch);
      });

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK, { body, onSuccessDispatched })(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(`${API_URL}?name=test`);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });

        expect(onSuccessDispatched).toHaveBeenCalled();
        expect(onSuccessDispatched).toHaveBeenCalledWith({ body, response: apiResponse, dispatch });
      });
    });

    it("should handle successful GET request with throwing onSuccessDispatched", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof get()).toEqual("function");

      let body = {
        name: "test"
      };
      let onSuccessDispatched = jest.fn(({ body: fnBody, response: fnResponse, dispatch: fnDispatch }) => {
        expect(fnBody).toEqual(body);
        expect(fnResponse).toEqual(apiResponse);
        expect(fnDispatch).toEqual(dispatch);
        throw new Error("expected error");
      });

      let result = get(API_RELATIVE_URL, ACTION_TYPE_MOCK, { body, onSuccessDispatched })(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(`${API_URL}?name=test`);
        expect(fetch.mock.calls[0][1].method).toEqual("GET");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });

        expect(onSuccessDispatched).toHaveBeenCalled();
        expect(onSuccessDispatched).toHaveBeenCalledWith({ body, response: apiResponse, dispatch });
        expect(onSuccessDispatched).toThrow();
      });
    });
  });

  describe("post", () => {
    beforeEach(() => {
      fetch.resetMocks();
      dispatch = jest.fn();
    });

    it("should handle simple successful POST request", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof post()).toEqual("function");

      let result = post(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("POST");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });
      });
    });

    it("should handle simple failed POST request", () => {
      let apiError = { code: "genericError" };
      fetch.mockRejectOnce(apiError);

      expect(typeof post()).toEqual("function");

      let result = post(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("POST");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_ERROR, response: apiError });
      });
    });
  });

  describe("put", () => {
    beforeEach(() => {
      fetch.resetMocks();
      dispatch = jest.fn();
    });

    it("should handle simple successful PUT request", () => {
      let apiResponse = { mock: "y" };
      fetch.mockResponseOnce(JSON.stringify(apiResponse));

      expect(typeof put()).toEqual("function");

      let result = put(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("PUT");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_SUCCESS, response: apiResponse });
      });
    });

    it("should handle simple failed PUT request", () => {
      let apiError = { code: "genericError" };
      fetch.mockRejectOnce(apiError);

      expect(typeof put()).toEqual("function");

      let result = put(API_RELATIVE_URL, ACTION_TYPE_MOCK)(dispatch);

      return result.then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(API_URL);
        expect(fetch.mock.calls[0][1].method).toEqual("PUT");
        expect(fetch.mock.calls[0][1].body).toBeUndefined();

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK });
        expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPE_MOCK_ERROR, response: apiError });
      });
    });
  });
});
