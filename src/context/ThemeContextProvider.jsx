import React, { createContext, useContext, useEffect, useState } from "react";
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
      // backgroundColor: "#e8eefa",
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
  const [colors, setColors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const orgCode =
    useSelector((state) => state.authSlice?.orgDetails?.orgCode) || "KHAR";

  const applyThemeColors = (colors) => {
    if (!colors) return;

    const root = document.documentElement;

    root.style.setProperty("--primary-color", colors.primary, "important");
    root.style.setProperty("--secondary-color", colors.secondary, "important");
    root.style.setProperty(
      "--background-color",
      colors.backgroundColor,
      "important"
    );
    root.style.setProperty("--text-color", colors.textColor, "important");

    root.style.setProperty("--sidebar-bg-color", colors.sidebarBg, "important");
    root.style.setProperty(
      "--sidebar-active-tab",
      colors.sidebarActiveTab,
      "important"
    );
    root.style.setProperty(
      "--sidebar-sub-tab",
      colors.sidebarSubTab,
      "important"
    );
    root.style.setProperty(
      "--sidebar-onhover-tab",
      colors.sidebarOnHoverTab,
      "important"
    );
    root.style.setProperty(
      "--sidebar-onhover-tab-text",
      colors.sidebarOnHoverTabText,
      "important"
    );
    root.style.setProperty(
      "--sidebar-active-tab-text",
      colors.sidebarActiveTabText,
      "important"
    );

    root.style.setProperty(
      "--skill-card-bg-color",
      colors.skillCardBg,
      "important"
    );
    root.style.setProperty(
      "--table-header-bg",
      colors.tableHeaderBg,
      "important"
    );

    root.style.setProperty("--text-on-dark", colors.textOnDark, "important");
    root.style.setProperty("--text-on-light", colors.textOnLight, "important");
  };

  const muiTheme = createTheme({
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
              opacity: 1,
            },
          },
          input: {
            "&.Mui-disabled": {
              color: "#444",
              WebkitTextFillColor: "#444",
              opacity: 1,
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
  });

  useEffect(() => {
    const fallbackThemeName =
      orgCode === "SRA" ? "customMaroon" : "defaultBlue";
    const fallbackTheme = themesJson.find(
      (t) => t.name === fallbackThemeName
    )?.colors;

    if (fallbackTheme) {
      setColors(fallbackTheme);
      applyThemeColors(fallbackTheme);
    }

    setIsLoading(false);
  }, [orgCode]);

  return (
    <ThemeContext.Provider value={{ colors, isLoading }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
