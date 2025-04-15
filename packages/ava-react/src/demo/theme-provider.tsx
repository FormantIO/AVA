import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { DEFAULT_THEME_COLORS } from "./default-theme-colors";
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Loop through theme keys and set them as CSS custom properties */
    ${({ theme }) =>
      Object.entries(theme).reduce((styles, [key, value]) => {
        return styles + `${key}: ${value};\n`
      }, '')
    }
  }
`;

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

export const darkTheme = Object.keys(DEFAULT_THEME_COLORS).reduce((theme, key) => ({
    ...theme,
    [key]: DEFAULT_THEME_COLORS[key].defaultValue,
  }), {});
  
  export const lightTheme = Object.keys(DEFAULT_THEME_COLORS).reduce((theme, key) => ({
    ...theme,
    [key]: DEFAULT_THEME_COLORS[key].defaultLightValue,
  }), {});

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function CustomThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    );

    useEffect(() => {
        const root = window.document.documentElement;



        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme: (t: Theme) => {
                localStorage.setItem(storageKey, t);
                setTheme(t);
            },
        }),
        [theme, storageKey],
    );

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

