import { styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

export const drawerWidth = 240;

/**
 * @memberof Sidebar
 * Style overrides for the drawer when it is open. This is used to animate the drawer's width
 * when it is opened or closed.
 *
 * @param {Object} theme - The current theme object
 * @returns {Object} - An object containing the style overrides
 */
export const openedMixin = (theme) => ({
  width: drawerWidth, // Set the drawer width when it is opena
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: "var(--sidebar-bg-color)",
  color: "white",
  padding: "10px",
});

/**
 * @memberof Sidebar
 * Style overrides for the drawer when it is closed. This is used to animate the drawer's width
 * when it is opened or closed.
 *
 * @param {Object} theme - The current theme object
 * @returns {Object} - An object containing the style overrides
 */
export const closedMixin = (theme) => ({
  width: drawerWidth, // Set the drawer width when it is opena
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: "var(--sidebar-bg-color)",
  color: "white",
  padding: "10px",

  // transition: theme.transitions.create("width", {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  // overflowX: "hidden",
  // width: `calc(${theme.spacing(7)} + 1px)`, // Set the drawer width when it is closed
  // [theme.breakpoints.up("sm")]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`, // Adjust width for larger screens
  // },
  // background: "var(--sidebar-bg-color)",
  // color: "white",
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme), // Apply styles defined in openedMixin when the drawer is open
    "& .MuiDrawer-paper": openedMixin(theme), // Apply styles to the drawer's paper when it is open
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const headingTextStyle = {
  fontSize: "var(--font-size-small)",
  fontWeight: "bold",
  color: "white",
};
