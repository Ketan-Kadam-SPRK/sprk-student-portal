import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

const themesJson = [
  {
    name: "defaultBlue",
    colors: {
      backgroundColor: "#dce8ff",
      textColor: "#1A1A1A",
      primary: "#007bff",
      secondary: "#007bff",
      sidebarBg: "#0A2647",
      sidebarActiveTab: "#0056b3",
      sidebarSubTab: "#cce5ff",
      sidebarOnHoverTab: "#cce5ff",
      sidebarOnHoverTabText: "#0056b3",
      sidebarActiveTabText: "#ffffff",
      tableHeaderBg: "#007bff",
      skillCardBg: "linear-gradient(180deg, #007bff 0%, #0A2647 100%)",
      textOnDark: "#ffffff",
      textOnLight: "#1A1A1A",
    },
  },
  {
    name: "customMaroon",
    colors: {
      backgroundColor: "#FDF7F7",
      textColor: "#1A1A1A",
      primary: "#800000",
      secondary: "#B22222",
      sidebarBg: "#4B0000",
      sidebarActiveTab: "#990000",
      sidebarSubTab: "#e6b8b8",
      sidebarOnHoverTab: "#e6b8b8",
      sidebarOnHoverTabText: "#800000",
      sidebarActiveTabText: "#ffffff",
      tableHeaderBg: "#800000",
      skillCardBg: "linear-gradient(180deg, #800000 0%, #4B0000 100%)",
      textOnDark: "#ffffff",
      textOnLight: "#1A1A1A",
    },
  },
];

export const ThemeProvider = ({ children }) => {
  const orgCode =
    useSelector((state) => state.authSlice?.orgDetails?.orgCode) || "KHAR";

  // ✅ fallback theme resolved immediately
  const defaultThemeColors = useMemo(() => {
    const themeName = orgCode === "SRA" ? "customMaroon" : "defaultBlue";
    return themesJson.find((t) => t.name === themeName)?.colors;
  }, [orgCode]);

  const [colors, setColors] = useState(defaultThemeColors);

  const applyThemeColors = useCallback((colors) => {
    if (!colors) return;

    const root = document.documentElement;

    Object.entries({
      "--primary-color": colors.primary,
      "--secondary-color": colors.secondary,
      "--background-color": colors.backgroundColor,
      "--text-color": colors.textColor,
      "--sidebar-bg-color": colors.sidebarBg,
      "--sidebar-active-tab": colors.sidebarActiveTab,
      "--sidebar-sub-tab": colors.sidebarSubTab,
      "--sidebar-onhover-tab": colors.sidebarOnHoverTab,
      "--sidebar-onhover-tab-text": colors.sidebarOnHoverTabText,
      "--sidebar-active-tab-text": colors.sidebarActiveTabText,
      "--skill-card-bg-color": colors.skillCardBg,
      "--table-header-bg": colors.tableHeaderBg,
      "--text-on-dark": colors.textOnDark,
      "--text-on-light": colors.textOnLight,
    }).forEach(([key, value]) => root.style.setProperty(key, value));
  }, []);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: colors?.primary || "#007bff" },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "capitalize",
                fontSize: "14px",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "&.Mui-disabled": {
                  backgroundColor: "#f1f1f1",
                },
              },
              input: {
                "&.Mui-disabled": {
                  color: "#444",
                  WebkitTextFillColor: "#444",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              select: {
                "&.Mui-disabled": {
                  color: "#555555",
                  WebkitTextFillColor: "#555555",
                },
              },
            },
          },
        },
      }),
    [colors]
  );

  useEffect(() => {
    setColors(defaultThemeColors);
    applyThemeColors(defaultThemeColors);
  }, [defaultThemeColors, applyThemeColors]);

  return (
    <ThemeContext.Provider value={{ colors }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
