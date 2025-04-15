import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
interface ThemeColors {
    background: {
        primary: string;
        secondary: string;
        tertiary: string;
        surface: string;
        headerModule: string;
        headerTable: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        muted: string;
        headerModule: string;
        headerTable: string;
    };
    border: {
        primary: string;
        secondary: string;
        tertiary: string;
        current: string;
        active: string;
    };
    action: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
    };
    status: {
        active: string;
        inactive: string;
    };
    accentPrimary: string;
}

// Default theme colors
const defaultTheme: ThemeColors = {
    background: {
        primary: "#2D3855",
        secondary: "#282F45",
        tertiary: "#1C1E2D",
        surface: "#000000",
        headerModule: "#1C1E2D",
        headerTable: "#2D3855",
    },
    text: {
        primary: "#FFFFFF",
        secondary: "#BAC4E2",
        tertiary: "#657197",
        muted: "#2D3855",
        headerModule: "#FFFFFF",
        headerTable: "#BAC4E2",
    },
    border: {
        primary: "#1C1E2D",
        secondary: "#282F45",
        tertiary: "#000000",
        current: "#FFFFFF",
        active: "#18D2FF",
    },
    action: {
        primary: "#18D2FF",
        secondary: "#BAC4E2",
        tertiary: "#3B4668",
        quaternary: "#2D3855",
    },
    status: {
        active: "#18D2FF",
        inactive: "#BAC4E2",
    },
    accentPrimary: "#20A0FF",
};

// Create theme context
const ThemeContext = createContext<{
    theme: ThemeColors;
    setTheme: (theme: ThemeColors) => void;
}>({
    theme: defaultTheme,
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

    // Apply theme colors to CSS variables
    useEffect(() => {
        // Background colors
        document.documentElement.style.setProperty(
            "--color-background-primary",
            theme.background.primary,
        );
        document.documentElement.style.setProperty(
            "--color-background-secondary",
            theme.background.secondary,
        );
        document.documentElement.style.setProperty(
            "--color-background-tertiary",
            theme.background.tertiary,
        );
        document.documentElement.style.setProperty(
            "--color-background-surface",
            theme.background.surface,
        );
        document.documentElement.style.setProperty(
            "--color-background-header-module",
            theme.background.headerModule,
        );
        document.documentElement.style.setProperty(
            "--color-background-header-table",
            theme.background.headerTable,
        );

        // Text colors
        document.documentElement.style.setProperty(
            "--color-text-primary",
            theme.text.primary,
        );
        document.documentElement.style.setProperty(
            "--color-text-secondary",
            theme.text.secondary,
        );
        document.documentElement.style.setProperty(
            "--color-text-tertiary",
            theme.text.tertiary,
        );
        document.documentElement.style.setProperty(
            "--color-text-muted",
            theme.text.muted,
        );
        document.documentElement.style.setProperty(
            "--color-text-header-module",
            theme.text.headerModule,
        );
        document.documentElement.style.setProperty(
            "--color-text-header-table",
            theme.text.headerTable,
        );

        // Border colors
        document.documentElement.style.setProperty(
            "--color-border-primary",
            theme.border.primary,
        );
        document.documentElement.style.setProperty(
            "--color-border-secondary",
            theme.border.secondary,
        );
        document.documentElement.style.setProperty(
            "--color-border-tertiary",
            theme.border.tertiary,
        );
        document.documentElement.style.setProperty(
            "--color-border-current",
            theme.border.current,
        );
        document.documentElement.style.setProperty(
            "--color-border-active",
            theme.border.active,
        );

        // Action colors
        document.documentElement.style.setProperty(
            "--color-action-primary",
            theme.action.primary,
        );
        document.documentElement.style.setProperty(
            "--color-action-secondary",
            theme.action.secondary,
        );
        document.documentElement.style.setProperty(
            "--color-action-tertiary",
            theme.action.tertiary,
        );
        document.documentElement.style.setProperty(
            "--color-action-quaternary",
            theme.action.quaternary,
        );

        // Status colors
        document.documentElement.style.setProperty(
            "--color-status-active",
            theme.status.active,
        );
        document.documentElement.style.setProperty(
            "--color-status-inactive",
            theme.status.inactive,
        );

        // Accent color
        document.documentElement.style.setProperty(
            "--color-accent-primary",
            theme.accentPrimary,
        );
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}