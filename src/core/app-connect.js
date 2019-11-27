import { connect as reduxConnect } from "react-redux";
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { withNavigation } from "components/hoc/navigation";
import withLoader from "components/hoc/loader";

function connect({
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  pure,
  titleKey,
  styles,
  stylesName,
  actionType,
  showLoader,
  loadData,
  fullWidth,
  didMount
} = {}) {
  return component => {
    let connectedComponent = injectIntl(component);

    connectedComponent = withNavigation({ titleKey, actionType, fullWidth, didMount })(connectedComponent);
    if (loadData) {
      connectedComponent = withLoader({ showLoader, loadData })(connectedComponent);
    }
    pure = undefined;
    if (mapStateToProps || mapDispatchToProps || mergeProps || pure !== undefined) {
      let options = undefined;
      if (pure !== undefined) {
        options = { pure };
      }
      connectedComponent = reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)(connectedComponent);
    }

    if (styles) {
      connectedComponent = withStyles(styles, { name: stylesName })(connectedComponent);
    }

    return connectedComponent;
  };
}

export default connect;
