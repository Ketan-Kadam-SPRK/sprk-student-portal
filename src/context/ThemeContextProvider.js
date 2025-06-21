import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

const themesJson = [
  {
    name: "default",
    colors: {
      primary: "#085186",
      secondary: "#F0F4FF",
      sidebarBg: "#0d1821",
      sidebarActiveTab: "#3989B8",
      sidebarSubTab: "#264052",
      tableHeaderBg: "#085186",
      skillCardBg: "linear-gradient(180deg, #02012E 0%, #060513 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkGrey",
    colors: {
      primary: "#2E2E2E",
      secondary: "#F2F2F2",
      sidebarBg: "#1F1F1F",
      sidebarActiveTab: "#3A3A3A",
      sidebarSubTab: "#4F4F4F",
      tableHeaderBg: "#2B2B2B",
      skillCardBg: "linear-gradient(180deg, #2B2B2B 0%, #1C1C1C 100%)",
      textOnDark: "#FFFFFF",
      textOnLight: "#1A1A1A",
    },
  },
  {
    name: "lavenderPurple",
    colors: {
      primary: "#7B61FF",
      secondary: "#F3F0FF",
      sidebarBg: "#5F4B8B",
      sidebarActiveTab: "#7B61FF",
      sidebarSubTab: "#9C88FF",
      tableHeaderBg: "#6A5ACD",
      skillCardBg: "linear-gradient(180deg, #7B61FF 0%, #5F4B8B 100%)",
      textOnDark: "#FFFFFF",
      textOnLight: "#1A1A1A",
    },
  },
  {
    name: "bottleGreen",
    colors: {
      primary: "#006A4E",
      secondary: "#E6F2EE",
      sidebarBg: "#004D3B",
      sidebarActiveTab: "#007D5E",
      sidebarSubTab: "#004D3B",
      tableHeaderBg: "#006A4E",
      skillCardBg: "linear-gradient(180deg, #02012E 0%, #060513 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkBlue",
    colors: {
      primary: "#085186",
      secondary: "#F0F4FF",
      sidebarBg: "#0d1821",
      sidebarActiveTab: "#3989B8",
      sidebarSubTab: "#264052",
      tableHeaderBg: "#085186",
      skillCardBg: "linear-gradient(180deg, #02012E 0%, #060513 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkRed",
    colors: {
      primary: "#7a1c1c",
      secondary: "#FBEAEA",
      sidebarBg: "#4B0000",
      sidebarActiveTab: "#9e2b2b",
      sidebarSubTab: "#661919",
      tableHeaderBg: "#7a1c1c",
      skillCardBg: "linear-gradient(180deg, #661515 0%, #3b0d0d 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkGreen",
    colors: {
      primary: "#006A4E",
      secondary: "#E6F2EE",
      sidebarBg: "#004D3B",
      sidebarActiveTab: "#007D5E",
      sidebarSubTab: "#004D3B",
      tableHeaderBg: "#006A4E",
      skillCardBg: "linear-gradient(180deg, #02012E 0%, #060513 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkPurple",
    colors: {
      primary: "#7B61FF",
      secondary: "#F3F0FF",
      sidebarBg: "#5F4B8B",
      sidebarActiveTab: "#7B61FF",
      sidebarSubTab: "#9C88FF",
      tableHeaderBg: "#6A5ACD",
      skillCardBg: "linear-gradient(180deg, #7B61FF 0%, #5F4B8B 100%)",
      textOnDark: "#FFFFFF",
      textOnLight: "#1A1A1A",
    },
  },
  {
    name: "orange",
    colors: {
      primary: "#FF6B6B",
      secondary: "#FFF5F5",
      sidebarBg: "#FF6B6B",
      sidebarActiveTab: "#FF6B6B",
      sidebarSubTab: "#FF6B6B",
      tableHeaderBg: "#FF6B6B",
      skillCardBg: "linear-gradient(180deg, #FF6B6B 0%, #FF6B6B 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkOrange",
    colors: {
      primary: "#FF6B6B",
      secondary: "#FFF5F5",
      sidebarBg: "#FF6B6B",
      sidebarActiveTab: "#FF6B6B",
      sidebarSubTab: "#FF6B6B",
      tableHeaderBg: "#FF6B6B",
      skillCardBg: "linear-gradient(180deg, #FF6B6B 0%, #FF6B6B 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
  {
    name: "darkYellow",
    colors: {
      primary: "#FF6B6B",
      secondary: "#FFF5F5",
      sidebarBg: "#FF6B6B",
      sidebarActiveTab: "#FF6B6B",
      sidebarSubTab: "#FF6B6B",
      tableHeaderBg: "#FF6B6B",
      skillCardBg: "linear-gradient(180deg, #FF6B6B 0%, #FF6B6B 100%)",
      textOnDark: "white",
      textOnLight: "black",
    },
  },
];

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const orgCode =
    useSelector((state) => state.authData?.orgDetails?.orgCode) || "KHAR";

  const applyThemeColors = (colors) => {
    if (!colors) return;

    const root = document.documentElement;
    root.style.setProperty("--primary-color", colors.primary);
    root.style.setProperty("--background-color", colors.secondary);
    root.style.setProperty("--sidebar-bg-color", colors.sidebarBg);
    root.style.setProperty("--sidebar-acitve-tab", colors.sidebarActiveTab);
    root.style.setProperty("--sidebar-subTab-color", colors.sidebarSubTab);
    root.style.setProperty("--skill-card-bg-color", colors.skillCardBg);
    root.style.setProperty("--text-on-dark", colors.textOnDark);
    root.style.setProperty("--text-on-light", colors.textOnLight);
  };

  // Create MUI theme based on current colors
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: colors?.primary || "#085186",
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
    const fetchThemeColors = async () => {
      try {
        const response = await fetch("/api/theme-colors");
        const colorsData = await response.json();
        setColors(colorsData);
        applyThemeColors(colorsData);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
        // Fallback to darkRed theme if API fails
        const darkRedTheme = themesJson.find(
          (theme) => theme.name === (orgCode === "SRA" ? "darkRed" : "default")
        ).colors;
        setColors(darkRedTheme);
        applyThemeColors(darkRedTheme);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeColors();
  }, [orgCode]);

  return (
    <ThemeContext.Provider value={{ colors, isLoading }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
