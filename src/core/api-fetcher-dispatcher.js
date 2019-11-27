import constructApiPath from "utils/url-utils";

function issueRequest({
  method,
  relativeApiRoute,
  actionType,
  body,
  onSuccessDispatching,
  onSuccessDispatched,
  onErrorDispatched
}) {
  return dispatch => {
    dispatch({
      type: `${actionType}`
    });

    let url = constructApiPath(relativeApiRoute);
    let reqBody = body !== undefined ? JSON.stringify(body) : undefined;

    if (method == "GET" && body) {
      reqBody = undefined;

      var queryString = Object.keys(body)
        .filter(key => body[key] != null)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
        .join("&");

      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    return fetch(url, {
      method: method,
      body: reqBody,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
          if (response.status == 204) return {};
          return response.json();
        }
        return response.json().then(responseJson => {
          throw responseJson;
        });
      })
      .then(response => {
        if (typeof onSuccessDispatching === "function") {
          try {
            let dispatchingResult = onSuccessDispatching({ body, response, dispatch });
            if (dispatchingResult === false) {
              return;
            }
          } catch (error) {
            /* eslint-disable no-console */
            console.error("onSuccessDispatching failure");
            console.error(error);
            /* eslint-enable no-console */
          }
        }

        let dispatchResult = dispatch({
          type: `${actionType}_SUCCESS`,
          response
        });

        if (onSuccessDispatched) {
          try {
            onSuccessDispatched({ body, response, dispatch });
          } catch (error) {
            /* eslint-disable no-console */
            console.error("onSuccessDispatched failure");
            console.error(error);
            /* eslint-enable no-console */
          }
        }

        return dispatchResult;
      })
      .catch(response => {
        let errorResult = dispatch({
          type: `${actionType}_ERROR`,
          response
        });

        if (onErrorDispatched) {
          try {
            onErrorDispatched({ body, response, dispatch });
          } catch (error) {
            /* eslint-disable no-console */
            console.error("onErrorDispatched failure");
            console.error(error);
            /* eslint-enable no-console */
          }
        }

        return errorResult;
      });
  };
}

export function get(relativeApiRoute, actionType, options = {}) {
  return issueRequest({ method: "GET", relativeApiRoute, actionType, ...options });
}

export function post(relativeApiRoute, actionType, options = {}) {
  return issueRequest({ method: "POST", relativeApiRoute, actionType, ...options });
}

export function put(relativeApiRoute, actionType, options = {}) {
  return issueRequest({ method: "PUT", relativeApiRoute, actionType, ...options });
}
