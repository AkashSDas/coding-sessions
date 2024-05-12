import { createContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

export default function App(): JSX.Element {
    return (
        <ThemeProvider>
            <ThemeToggler />
        </ThemeProvider>
    );
}

type ThemeProviderProps = {
    children: React.ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
    const [theme, setTheme] = useState<Theme>("light");

    function toggleTheme(): void {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function ThemeToggler(): JSX.Element {
    return (
        <ThemeContext.Consumer>
            {function ({ theme, toggleTheme }): JSX.Element {
                return (
                    <button onClick={toggleTheme}>
                        {theme === "light"
                            ? "Switch to Dark"
                            : "Switch to Light"}
                    </button>
                );
            }}
        </ThemeContext.Consumer>
    );
}
