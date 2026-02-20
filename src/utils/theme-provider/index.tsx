import * as React from "react";

export type Theme = "light" | "dark" | "blue-dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark" | "blue-dark";
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<
    "light" | "dark" | "blue-dark"
  >(() => {
    if (theme === "system") return getSystemTheme();
    return theme as "light" | "dark" | "blue-dark";
  });

  const applyTheme = React.useCallback(
    (selectedTheme: Theme) => {
      const root = document.documentElement;

      root.classList.remove("dark", "blue-dark");

      let finalTheme: "light" | "dark" | "blue-dark";

      if (selectedTheme === "system") {
        finalTheme = getSystemTheme();
      } else {
        finalTheme = selectedTheme;
      }

      if (finalTheme === "dark") {
        root.classList.add("dark");
      }

      if (finalTheme === "blue-dark") {
        root.classList.add("blue-dark");
      }

      setResolvedTheme(finalTheme);
    },
    []
  );

  // Apply theme when theme changes
  React.useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme, applyTheme]);

  // Listen for system changes
  React.useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      applyTheme("system");
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
