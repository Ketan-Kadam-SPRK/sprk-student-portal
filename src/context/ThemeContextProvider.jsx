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
      backgroundColor: "#F4F7FC",
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

    root.style.setProperty("--primary-color", colors.primary);
    root.style.setProperty("--secondary-color", colors.secondary);
    root.style.setProperty("--background-color", colors.backgroundColor);
    root.style.setProperty("--text-color", colors.textColor);

    root.style.setProperty("--sidebar-bg-color", colors.sidebarBg);
    root.style.setProperty("--sidebar-acitve-tab", colors.sidebarActiveTab);
    root.style.setProperty("--sidebar-subTab-color", colors.sidebarSubTab);
    root.style.setProperty("--sidebar-onhover-tab", colors.sidebarOnHoverTab);
    root.style.setProperty(
      "--sidebar-onhover-tab-text",
      colors.sidebarOnHoverTabText
    );
    root.style.setProperty(
      "--sidebar-active-tab-text",
      colors.sidebarActiveTabText
    );

    root.style.setProperty("--skill-card-bg-color", colors.skillCardBg);
    root.style.setProperty("--table-header-bg", colors.tableHeaderBg);

    root.style.setProperty("--text-on-dark", colors.textOnDark);
    root.style.setProperty("--text-on-light", colors.textOnLight);

    // Optional font sizes
    root.style.setProperty("--font-size-extra-small", "clamp(12px, 1vw, 13px)");
    root.style.setProperty("--font-size-small", "clamp(14px, 1vw, 16px)");
    root.style.setProperty("--font-size-medium", "clamp(16px, 3vw, 20px)");
    root.style.setProperty("--font-size-large", "clamp(20px, 4vw, 32px)");
  };

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: colors?.primary || "#007bff",
      },
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
    // const fetchThemeColors = async () => {
    //   try {
    //     const response = await fetch("/api/theme-colors");
    //     const colorsData = await response.json();
    //     if (colorsData) {
    //       setColors(colorsData);
    //       applyThemeColors(colorsData);
    //     }
    //   } catch (error) {
    // console.error("Error fetching theme colors:", error);
    const fallbackThemeName =
      orgCode === "SRA" ? "customMaroon" : "defaultBlue";
    const fallbackTheme = themesJson?.find(
      (theme) => theme.name === fallbackThemeName
    )?.colors;

    if (fallbackTheme) {
      setColors(fallbackTheme);
      applyThemeColors(fallbackTheme);
    }
    // } finally {
    //   setIsLoading(false);
    // }
    // };

    // fetchThemeColors();
  }, [orgCode]);

  return (
    <ThemeContext.Provider value={{ colors, isLoading }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
