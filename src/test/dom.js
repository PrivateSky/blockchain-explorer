import { shape } from "prop-types";
import { MemoryRouter } from "react-router-dom";
import { mountWithIntl, loadTranslationObject } from "enzyme-react-intl";
import { IntlProvider } from "react-intl";

let locale = "en";

import messages from "locales/en";
import IntlGlobalProvider from "core/intl-global-provider";

loadTranslationObject(messages);

const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {}
  }
};

// required to be able to access intl outside of the AppWrappers
const intlProvider = new IntlProvider({ locale: locale, messages }, {});
new IntlGlobalProvider({}, intlProvider.getChildContext());

export function mount(node) {
  return mountWithIntl(node, {
    context: { router },
    childContextTypes: { router: shape({}) }
  });
}
