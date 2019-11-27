import blue from "@material-ui/core/colors/blue";

const themeConfig = {
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: blue[800],
      title: "#463f3f",
      darker: "#1f699a",
      background: "#fafafa",
      header: "#e4dee6"
    },
    secondary: {
      main: "#108ea5"
    },
    utils: {
      background: "#fff",
      border: "#ced1d4",
      highlighter: "#f7f2eb"
    },
    table: {
      header: {
        text: "#463f3f",
        background: "#f7f8fd"
      }
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        wordWrap: "break-word",
        whiteSpace: "normal"
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 16,
        fontWeight: "bold"
      }
    },
    MuiListItemText: {
      primary: {
        textAlign: "center"
      }
    },
    MuiSelect: {
      select: {
        fontWeight: "bold",
        padding: 10,
        fontSize: 16
      },
      selectMenu: {
        whiteSpace: "pre-wrap"
      }
    },
    MuiDialog: {
      paperWidthMd: {
        padding: 0,
        margin: 0
      }
    },
    MuiMenuItem: {
      root: {
        color: "black",
        whiteSpace: "pre-wrap",
        "&:hover": {
          backgroundColor: "#c1c4c7 !important",
          color: "black"
        }
      },
      selected: {
        backgroundColor: "#c1c4c7 !important",
        color: "black"
      }
    },
    MuiInputLabel: {
      formControl: {
        top: -8
      },
      shrink: {
        top: 0
      }
    },
    MuiCircularProgress: {
      root: {
        marginRight: 10
      },
      colorPrimary: {
        color: "white"
      }
    },
    MuiExpansionPanel: {
      root: {
        "&:last-child": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        "&:first-child": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }
      }
    },
    MuiExpansionPanelSummary: {
      expandIcon: {
        top: "40%",
        right: "-2px",
        transition: "none"
      }
    }
  }
};

export default themeConfig;
