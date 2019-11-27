import React, { Fragment } from "react";

import { intl } from "core/intl-global-provider";

export const validationRules = [{ name: "isTruthy", validate: value => value }];

export function getComponentValidationInfo({ validators, errorMessages, errorText, componentOptions }) {
  let parsedValidators = validators.map(validator => {
    if (typeof validator === "string") return validator;
    if (validator.type) return validator.type;
  });

  let errorTexts;
  if (errorMessages && errorMessages.length) {
    errorTexts = errorMessages;
  } else if (errorText != null) {
    errorTexts = errorText;
  } else {
    errorTexts = validators.map(validator => {
      let validatorType = typeof validator === "string" ? validator : validator.type;
      validatorType = (validatorType || "").trim();

      let inferredErrorTextKey;
      let intlValues = undefined;

      if (validatorType === "required") {
        if (componentOptions.label) {
          componentOptions.label = (
            <Fragment>
              {componentOptions.label} <span style={{ color: "#FF0000" }}>*</span>
            </Fragment>
          );
        }
        inferredErrorTextKey = "validation.required";
      } else if (validatorType === "isEmail") {
        inferredErrorTextKey = "validation.isEmail";
      } else if (validatorType === "isFloat") {
        inferredErrorTextKey = "validation.isFloat";
      } else if (validatorType === "isPositive") {
        inferredErrorTextKey = "validation.isPositive";
      } else if (validatorType === "isMatch") {
        inferredErrorTextKey = "validation.isMatch";
        intlValues = { match: intl.formatMessage({ id: validator.matchLabel }) };
      }

      inferredErrorTextKey = inferredErrorTextKey || "validation.defaultErrorText";

      return intl.formatMessage({ id: inferredErrorTextKey }, intlValues);
    });
  }

  return { parsedValidators, errorTexts };
}
