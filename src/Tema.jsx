import { createMuiTheme } from "@material-ui/core/styles";

export const getAppTheme = (darkMode) => {
  return createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        light: "#60a5fa",
        main: darkMode ? "#3b82f6" : "#1d4ed8",
        dark: "#1e40af",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#34d399",
        main: "#059669",
        dark: "#047857",
        contrastText: "#ffffff",
      },
      error: {
        light: "#fca5a5",
        main: "#ef4444",
        dark: "#b91c1c",
        contrastText: "#ffffff",
      },
      warning: {
        light: "#fde68a",
        main: "#f59e0b",
        dark: "#d97706",
        contrastText: "#1f2937",
      },
      info: {
        light: "#93c5fd",
        main: "#0284c7",
        dark: "#0369a1",
        contrastText: "#ffffff",
      },
      success: {
        light: "#86efac",
        main: "#16a34a",
        dark: "#15803d",
        contrastText: "#ffffff",
      },
      background: {
        default: darkMode ? "#121212" : "#f8fafc",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f3f4f6" : "#0f172a",
        secondary: darkMode ? "#9ca3af" : "#64748b",
        disabled: darkMode ? "#6b7280" : "#94a3b8",
      },
      divider: darkMode ? "#2e2e2e" : "#e2e8f0",
    },
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 700, letterSpacing: "-0.025em" },
      h2: { fontWeight: 700, letterSpacing: "-0.025em" },
      h3: { fontWeight: 700, letterSpacing: "-0.02em" },
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: darkMode ? "#f3f4f6" : "#0f172a",
      },
      h5: {
        fontWeight: 600,
        letterSpacing: "-0.015em",
        color: darkMode ? "#e5e7eb" : "#1e293b",
      },
      h6: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: darkMode ? "#d1d5db" : "#334155",
      },
      subtitle1: {
        fontWeight: 500,
        color: darkMode ? "#9ca3af" : "#64748b",
      },
      subtitle2: {
        fontWeight: 500,
        color: darkMode ? "#9ca3af" : "#64748b",
      },
      body1: {
        fontSize: "0.95rem",
        lineHeight: 1.6,
        color: darkMode ? "#d1d5db" : "#334155",
      },
      body2: {
        fontSize: "0.875rem",
        color: darkMode ? "#9ca3af" : "#64748b",
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.01em",
      },
    },
    shape: {
      borderRadius: 10,
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundColor: darkMode ? "#121212" : "#f8fafc",
            color: darkMode ? "#f3f4f6" : "#0f172a",
          },
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          color: darkMode ? "#f3f4f6" : "#0f172a",
          transition: "box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, background-color 0.2s ease",
        },
        elevation1: {
          boxShadow: darkMode
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.07)",
          border: darkMode ? "1px solid #2e2e2e" : "1px solid #e2e8f0",
        },
        elevation2: {
          boxShadow: darkMode
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
          border: darkMode ? "1px solid #2e2e2e" : "1px solid #e2e8f0",
        },
        elevation3: {
          boxShadow: darkMode
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.6)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
          border: darkMode ? "1px solid #2e2e2e" : "1px solid #e2e8f0",
        },
        rounded: {
          borderRadius: 12,
        },
      },
      MuiButton: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: "0.875rem",
          boxShadow: "none",
          transition: "all 0.15s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        },
        containedPrimary: {
          background: darkMode
            ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          color: "#ffffff",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.25)",
          "&:hover": {
            background: darkMode
              ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
              : "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          color: "#ffffff",
          boxShadow: "0 2px 4px rgba(5, 150, 105, 0.25)",
          "&:hover": {
            background: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.4)",
          },
        },
        outlined: {
          borderColor: darkMode ? "#3f3f46" : "#cbd5e1",
          color: darkMode ? "#f3f4f6" : "#334155",
          "&:hover": {
            borderColor: darkMode ? "#52525b" : "#94a3b8",
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 8,
          backgroundColor: darkMode ? "#181818" : "#ffffff",
          color: darkMode ? "#f3f4f6" : "#0f172a",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#333333" : "#cbd5e1",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#4d4d4d" : "#94a3b8",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#3b82f6" : "#1d4ed8",
            borderWidth: 2,
          },
        },
        input: {
          padding: "12px 14px",
          color: darkMode ? "#f3f4f6" : "#0f172a",
        },
      },
      MuiInputBase: {
        root: {
          color: darkMode ? "#f3f4f6" : "#0f172a",
        },
      },
      MuiInputLabel: {
        root: {
          color: darkMode ? "#9ca3af" : "#64748b",
        },
      },
      MuiSelect: {
        icon: {
          color: darkMode ? "#9ca3af" : "#64748b",
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: darkMode ? "1px solid #282828" : "1px solid #f1f5f9",
          padding: "14px 16px",
          fontSize: "0.875rem",
          color: darkMode ? "#d1d5db" : "#334155",
        },
        head: {
          backgroundColor: darkMode ? "#181818" : "#f8fafc",
          color: darkMode ? "#9ca3af" : "#475569",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          borderBottom: darkMode ? "2px solid #2e2e2e" : "2px solid #e2e8f0",
        },
      },
      MuiTableRow: {
        root: {
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.04) !important" : "#f8fafc !important",
          },
        },
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: darkMode ? "#181818" : "#1d4ed8",
          color: "#ffffff",
        },
      },
      MuiDrawer: {
        paper: {
          backgroundColor: darkMode ? "#181818" : "#ffffff",
          color: darkMode ? "#f3f4f6" : "#0f172a",
          borderRight: darkMode ? "1px solid #2e2e2e" : "1px solid #e2e8f0",
        },
      },
      MuiListItemIcon: {
        root: {
          color: darkMode ? "#9ca3af" : "#64748b",
          minWidth: 40,
        },
      },
      MuiListItem: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          width: "auto",
          color: darkMode ? "#d1d5db" : "#334155",
          transition: "all 0.15s ease",
          "&:hover": {
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
            color: darkMode ? "#ffffff" : "#1d4ed8",
          },
          "&.Mui-selected": {
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1) !important" : "rgba(37, 99, 235, 0.1) !important",
            color: darkMode ? "#ffffff" : "#1d4ed8",
            "& .MuiListItemIcon-root": {
              color: darkMode ? "#3b82f6" : "#1d4ed8",
            },
          },
        },
      },
      MuiChip: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },
  });
};

const defaultTheme = getAppTheme(false);
export default defaultTheme;